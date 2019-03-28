import * as actions from '../actions/MoviesActions';
import { put, call, all, select } from 'redux-saga/effects';
import { axiosTMDB3 } from '../../shared/AxiosMovieAPI';
import * as u from '../../shared/Utility';

// ================================== //
//          FETCH MOVIES INIT         //
// ================================== //
export function* fetchMoviesInitSaga(action) {
    let page = { nowPlaying: 1, upcoming: 1, popular: 1 },
        showPage = { nowPlaying: 1, upcoming: 1, popular: 1 },
        maxIterations = 5,
        hasLooped = false,
        loopAgain = {};

    try {
        const [imgConfig, movieGenres, listLength] = yield all([
            select(state => state.app.imgConfig),
            select(state => state.app.movieGenres),
            select(state => state.app.listLength)
        ]);

        yield put(actions.fetchMoviesStart({ listLength, imgConfig, movieGenres, showPage }));

        while (maxIterations > 0) {
            let nowPlaying = null,
                upcoming = null,
                popular = null,
                searchString = {
                    nowPlaying: ['/movie/top_rated?api_key=779c2c54e0eadd69f922e2be042fc737', '&language=en-US&page=', page['nowPlaying']].join(''),
                    upcoming: ['/movie/upcoming?api_key=779c2c54e0eadd69f922e2be042fc737', '&language=en-US&page=', page['upcoming']].join(''),
                    popular: ['/movie/popular?api_key=779c2c54e0eadd69f922e2be042fc737', '&language=en-US&page=', page['popular']].join('')
                };

            if (!hasLooped || loopAgain['nowPlaying']) {
                nowPlaying = yield call(axiosTMDB3, searchString.nowPlaying);
            }
            if (!hasLooped || loopAgain['upcoming']) {
                upcoming = yield call(axiosTMDB3, searchString.upcoming);
            }
            if (!hasLooped || loopAgain['popular']) {
                popular = yield call(axiosTMDB3, searchString.popular);
            }

            yield put(actions.fetchMoviesInitSuccess({
                nowPlaying: nowPlaying && nowPlaying.data,
                upcoming: upcoming && upcoming.data,
                popular: popular && popular.data
            }, { hasLooped, loopAgain, page, searchString }));

            const [nowPlayingLength, upcomingLength, popularLength, maxPage] = yield all([
                select(state => state.movies.movies['nowPlaying'].videos.length),
                select(state => state.movies.movies['upcoming'].videos.length),
                select(state => state.movies.movies['popular'].videos.length),
                select(state => state.movies.maxPage)
            ]);

            if (listLength > nowPlayingLength && maxPage['nowPlaying'] > page['nowPlaying']) {
                loopAgain['nowPlaying'] = true;
                page['nowPlaying']++;
            } else {
                loopAgain['nowPlaying'] = false;
            }
            if (listLength > upcomingLength && maxPage['upcoming'] > page['upcoming']) {
                loopAgain['upcoming'] = true;
                page['upcoming']++;
            } else {
                loopAgain['upcoming'] = false;
            }
            if (listLength > popularLength && maxPage['popular'] > page['popular']) {
                loopAgain['popular'] = true;
                page['popular']++;
            } else {
                loopAgain['popular'] = false;
            }

            const stopLoop = !loopAgain['nowPlaying'] && !loopAgain['upcoming'] && !loopAgain['popular'];
            const pageExceeded = page['nowPlaying'] >= maxPage['nowPlaying'] && page['upcoming'] >= maxPage['upcoming'] && page['popular'] >= maxPage['popular'];

            if (stopLoop || pageExceeded) {
                break;
            }

            maxIterations--;
            hasLooped = true;
        }
    } catch (error) {
        yield put(actions.fetchMoviesInitFail(error));
    }
}

// ================================== //
//          CHANGE MOVIE LIST         //
// ================================== //
export function* changeMovieListSaga(action) {
    let hasLooped = false,
        maxIterations = 5,
        category = u.toCamelCase(action.category);
    const { direction } = action;

    try {
        const listLength = yield select(state => state.app.listLength);

        while (maxIterations > 0) {
            const prevPage = yield select(state => state.movies.page[category]);

            yield put(actions.changeMovieListStart({ direction, hasLooped, category }));

            const [newPage, searchString] = yield all([
                select(state => state.movies.page[category]),
                select(state => state.movies.searchString[category])
            ]);

            if (direction === 'right' && (newPage > prevPage || hasLooped)) {
                let nextPageData = yield call(axiosTMDB3, searchString);
                yield put(actions.changeMovieListSuccess(nextPageData.data, direction, category));
            } else {
                yield put(actions.changeMovieListSuccess(-1, direction, category));
            }

            const { showPage, resultsLength, maxPage } = yield all({
                maxPage: select(state => state.movies.maxPage[category]),
                showPage: select(state => state.movies.showPage[category]),
                resultsLength: select(state => state.movies.movies[category].videos.length)
            })

            const loopAgain = showPage * listLength > resultsLength;

            if (!loopAgain || newPage >= maxPage) {
                break;
            }
            hasLooped = true;
            maxIterations--;
        }
    } catch (error) {
        yield put(actions.changeMovieListFail(error, category));
    }
}

// ================================== //
//    GET INDIVIDUAL MOVIE DETAILS    //
// ================================== //
export function* getMovieDetailsSaga(action) {
    const imgConfig = yield select(state => state.app.imgConfig);
    yield put(actions.getMovieDetailsStart({ imgConfig }));

    try {
        const { videos, credits, details, reviews } = yield all({
            videos: call(axiosTMDB3, '/movie/' + action.movieId + '/videos?api_key=779c2c54e0eadd69f922e2be042fc737'),

            credits: call(axiosTMDB3, '/movie/' + action.movieId + '/credits?api_key=779c2c54e0eadd69f922e2be042fc737'),

            details: call(axiosTMDB3, '/movie/' + action.movieId + '?api_key=779c2c54e0eadd69f922e2be042fc737'),

            reviews: call(axiosTMDB3, '/movie/' + action.movieId + '/reviews?api_key=779c2c54e0eadd69f922e2be042fc737')
        });

        yield put(actions.getMovieDetailsSuccess({
            videos: videos.data,
            credits: credits.data,
            details: details.data,
            reviews: reviews.data
        }));
    } catch (error) {
        yield put(actions.getMovieDetailsFail(error));
    }
}