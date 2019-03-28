import * as actions from '../actions/DiscoverActions';
import { put, call, all, select } from 'redux-saga/effects';
import { axiosTMDB3 } from '../../shared/AxiosMovieAPI';
import * as u from '../../shared/Utility';

export function* getDiscoverInitSaga(action) {
    let page = 1,
        showPage = 1,
        maxIterations = 5,
        hasLooped = false,
        loadType = 'init';

    try {
        const [imgConfig, listLength] = yield all([
            select(state => state.app.imgConfig),
            select(state => state.app.listLength)
        ]);

        const { media, year } = action.queryParams,
            queryPath = [year.name, year.value].join('=');

        yield put(actions.getDiscoverInitStart({ showPage, listLength, imgConfig }));

        while (maxIterations > 0) {
            const searchString = ['/discover/', media.name, '?api_key=779c2c54e0eadd69f922e2be042fc737', '&language=en-US&include_video=true&', queryPath, '&page=', page].join('');

            let results = yield call(axiosTMDB3, searchString);
            results = results.data;

            yield put(actions.getDiscoverResultsSuccess({ hasLooped, page, results, searchString, loadType }));

            const resultsLength = yield select(state => state.discover.results.length),
                maxPage = yield select(state => state.discover.maxPage),
                loopAgain = (1 * listLength > resultsLength) && maxPage > page;

            if (!loopAgain || page >= maxPage) {
                break;
            }

            page++;
            maxIterations--;
            hasLooped = true;
        }

    } catch (error) {
        yield put(actions.getDiscoverInitFail(error));
    }
}

export function* getDiscoverResultsSaga(action) {
    try {
        const query = action.queryParams,
            listLength = yield select(state => state.app.listLength);
        let queryPath = [],
            showPage = 1;

        yield put(actions.getDiscoverResultsStart(showPage));

        let idResults = yield all([
            call(getQueryIds, 'people', 'person', query),
            call(getQueryIds, 'keywords', 'keyword', query)
        ]);
        idResults = idResults.filter(id => !!id);

        Object.entries(query).forEach(([key, value]) => {
            if (key !== 'people' && key !== 'keywords' && key !== 'media') {
                queryPath.push([value.name, value.value].join('='));
            }
        });

        queryPath = u.isArrayGT(idResults, 0) ? [...queryPath, ...idResults].join('&') : queryPath.join('&');

        let maxIterations = 5,
            hasLooped = false,
            loadType = 'filter',
            page = 1;

        while (maxIterations > 0) {
            const searchString = ['/discover/', query.media.name, '?api_key=779c2c54e0eadd69f922e2be042fc737', '&language=en-US&include_adult=false&include_video=false&', queryPath, '&page=', page].join('');

            let results = yield call(axiosTMDB3, searchString);
            results = results.data;

            yield put(actions.getDiscoverResultsSuccess({ hasLooped, page, results, searchString, loadType }));

            const resultsLength = yield select(state => state.discover.results.length),
                maxPage = yield select(state => state.discover.maxPage),
                loopAgain = (1 * listLength > resultsLength) && maxPage !== page;

            if (!loopAgain || page >= maxPage) {
                break;
            }

            page++;
            maxIterations--;
            hasLooped = true;
        }
    } catch (error) {
        yield put(actions.getDiscoverResultsFail(error));
    }
}

// UTILITY - getDiscoverResultsSaga
function* getQueryIds(filter, searchType, queryParams) {
    if (queryParams[filter]) {
        const queries = queryParams[filter].value.match(/\b\w+(\s+\w+)*\b/g),
            queryResults = yield all(queries.map(query => call(getQueryId, query, searchType)));

        const queryIds = queryResults.flatMap(result => {
            return !!result.data.total_results ? result.data.results[0].id : null;
        });

        if (u.isArrayGT(queryIds, 0)) {
            return [queryParams[filter].name, queryIds].join('=');
        }
    }
    return null;
}

function* getQueryId(query, searchType) {
        try {
            return yield call(axiosTMDB3, '/search/' + searchType + '?api_key=779c2c54e0eadd69f922e2be042fc737&query=' + query + '&page=1');
        } catch (error) {
            console.log(error);
        }
    }
    // UTILITY END - getDiscoverResultsSaga

export function* changeDiscoverListSaga(action) {
    try {
        let hasLooped = false,
            maxIterations = 5;
        const { direction } = action;
        const listLength = yield select(state => state.app.listLength);

        while (maxIterations > 0) {
            const prevPage = yield select(state => state.discover.page);

            yield put(actions.changeDiscoverListStart(direction, hasLooped));

            const newPage = yield select(state => state.discover.page),
                searchString = yield select(state => state.discover.searchString);

            if (direction === 'right' && (newPage > prevPage || hasLooped)) {
                let nextPageData = yield call(axiosTMDB3, searchString);
                yield put(actions.changeDiscoverListSuccess(nextPageData.data, direction));
            } else {
                yield put(actions.changeDiscoverListSuccess(-1, direction));
            }

            const { showPage, resultsLength, maxPage } = yield all({
                showPage: select(state => state.discover.showPage),
                resultsLength: select(state => state.discover.results.length),
                maxPage: select(state => state.discover.maxPage)
            });

            const loopAgain = showPage * listLength > resultsLength;

            if (!loopAgain || newPage >= maxPage) {
                break;
            }
            hasLooped = true;
            maxIterations--;
        }
    } catch (error) {
        yield put(actions.changeDiscoverListFail(error));
    }
}