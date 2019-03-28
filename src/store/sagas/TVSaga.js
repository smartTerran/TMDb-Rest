import * as actions from '../actions/TVActions';
import { put, call, all, select } from 'redux-saga/effects';
import { axiosTMDB3 } from '../../shared/AxiosMovieAPI';
import * as u from '../../shared/Utility';

// ================================== //
//             FETCH TV INIT          //
// ================================== //
export function* fetchTVInitSaga(action) {
    let page = { airingToday: 1, onTheAir: 1, popular: 1 },
        showPage = { airingToday: 1, onTheAir: 1, popular: 1 },
        maxIterations = 5,
        hasLooped = false,
        loopAgain = {};


    try {
        let [imgConfig, tvGenres, movieGenres, listLength] = yield all([
            select(state => state.app.imgConfig),
            select(state => state.app.tvGenres),
            select(state => state.app.movieGenres),
            select(state => state.app.listLength)
        ]);

        tvGenres = tvGenres.concat(movieGenres);
        yield put(actions.fetchTVStart({ listLength, imgConfig, tvGenres, showPage }));

        while (maxIterations > 0) {
            let airingToday = null,
                onTheAir = null,
                popular = null,
                searchString = {
                    airingToday: ['/tv/airing_today?api_key=779c2c54e0eadd69f922e2be042fc737', '&language=en-US&page=', page['airingToday']].join(''),
                    onTheAir: ['/tv/on_the_air?api_key=779c2c54e0eadd69f922e2be042fc737', '&language=en-US&page=', page['onTheAir']].join(''),
                    popular: ['/tv/popular?api_key=779c2c54e0eadd69f922e2be042fc737', '&language=en-US&page=', page['popular']].join('')
                }

            if (!hasLooped || loopAgain['airingToday']) {
                airingToday = yield call(axiosTMDB3, searchString.airingToday);
            }
            if (!hasLooped || loopAgain['onTheAir']) {
                onTheAir = yield call(axiosTMDB3, searchString.onTheAir);
            }
            if (!hasLooped || loopAgain['popular']) {
                popular = yield call(axiosTMDB3, searchString.popular);
            }

            yield put(actions.fetchTVInitSuccess({
                airingToday: airingToday.data,
                onTheAir: onTheAir.data,
                popular: popular.data
            }, { hasLooped, loopAgain, page, searchString }));

            const [airingTodayLength, onTheAirLength, popularLength, maxPage] = yield all([
                select(state => state.tv.tv['airingToday'].videos.length),
                select(state => state.tv.tv['onTheAir'].videos.length),
                select(state => state.tv.tv['popular'].videos.length),
                select(state => state.tv.maxPage)
            ]);

            if (listLength > airingTodayLength && maxPage['airingToday'] > page['airingToday']) {
                loopAgain['airingToday'] = true;
                page['airingToday']++;
            } else {
                loopAgain['airingToday'] = false;
            }
            if (listLength > onTheAirLength && maxPage['onTheAir'] > page['onTheAir']) {
                loopAgain['onTheAir'] = true;
                page['onTheAir']++;
            } else {
                loopAgain['onTheAir'] = false;
            }
            if (listLength > popularLength && maxPage['popular'] > page['popular']) {
                loopAgain['popular'] = true;
                page['popular']++;
            } else {
                loopAgain['popular'] = false;
            }

            const stopLoop = !loopAgain['airingToday'] && !loopAgain['onTheAir'] && !loopAgain['popular'];
            const pageExceeded = page['airingToday'] >= maxPage['airingToday'] && page['onTheAir'] >= maxPage['onTheAir'] && page['popular'] >= maxPage['popular'];

            if (stopLoop || pageExceeded) {
                break;
            }

            maxIterations--;
            hasLooped = true;
        }
    } catch (error) {
        yield put(actions.fetchTVInitFail(error));
    }
}


// ================================== //
//           CHANGE TV LIST           //
// ================================== //
export function* changeTVListSaga(action) {
    let hasLooped = false,
        maxIterations = 5,
        category = u.toCamelCase(action.category);
    const { direction } = action;

    try {
        const listLength = yield select(state => state.app.listLength);

        while (maxIterations > 0) {
            const prevPage = yield select(state => state.tv.page[category]);

            yield put(actions.changeTVListStart({ direction, hasLooped, category }));

            const [newPage, searchString] = yield all([
                select(state => state.tv.page[category]),
                select(state => state.tv.searchString[category])
            ]);

            if (direction === 'right' && (newPage > prevPage || hasLooped)) {
                let nextPageData = yield call(axiosTMDB3, searchString);
                yield put(actions.changeTVListSuccess(nextPageData.data, direction, category));
            } else {
                yield put(actions.changeTVListSuccess(-1, direction, category));
            }

            const { showPage, resultsLength, maxPage } = yield all({
                maxPage: select(state => state.tv.maxPage[category]),
                showPage: select(state => state.tv.showPage[category]),
                resultsLength: select(state => state.tv.tv[category].videos.length)
            })

            const loopAgain = showPage * listLength > resultsLength;

            if (!loopAgain || newPage >= maxPage) {
                break;
            }
            hasLooped = true;
            maxIterations--;
        }
    } catch (error) {
        yield put(actions.changeTVListFail(error, category));
    }
}




// ================================== //
//      GET INDIVIDUAL TV DETAILS     //
// ================================== //
export function* getTVDetailsSaga(action) {
    yield put(actions.getTVDetailsStart());

    try {
        const imgConfig = yield select(state => state.app.imgConfig);
        const { videos, credits, details, reviews } = yield all({
            videos: call(axiosTMDB3, '/tv/' + action.tvId + '/videos?api_key=779c2c54e0eadd69f922e2be042fc737'),

            credits: call(axiosTMDB3, '/tv/' + action.tvId + '/credits?api_key=779c2c54e0eadd69f922e2be042fc737'),

            details: call(axiosTMDB3, '/tv/' + action.tvId + '?api_key=779c2c54e0eadd69f922e2be042fc737'),

            reviews: call(axiosTMDB3, '/tv/' + action.tvId + '/reviews?api_key=779c2c54e0eadd69f922e2be042fc737')
        });

        yield put(actions.getTVDetailsSuccess({
                videos: videos.data,
                credits: credits.data,
                details: details.data,
                reviews: reviews.data
            },
            imgConfig
        ));
    } catch (error) {
        yield put(actions.getTVDetailsFail(error));
    }
}