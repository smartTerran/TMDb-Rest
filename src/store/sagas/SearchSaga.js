import * as actions from '../actions/SearchActions';
import { put, call, select, all } from 'redux-saga/effects';
import { axiosTMDB3 } from '../../shared/AxiosMovieAPI';

export function* getSearchbarResultsSaga(action) {
  let page          = 1,
      showPage      = 1,
      maxIterations = 5,
      queryParams   = action.queryParams || 'null',
      hasLooped     = false;
      
  try {
    const [imgConfig, listLength] = yield all ([
      select(state => state.app.imgConfig),
      select(state => state.app.listLength)
    ]);

    yield put(actions.getSearchbarResultsStart({showPage, listLength, imgConfig}));

    while(maxIterations > 0) {      
      const searchString = ['/search/multi?api_key=779c2c54e0eadd69f922e2be042fc737', '&language=en-US&query=', queryParams, '&page=', page, '&include_adult=false'].join('');

      let searchResults = yield call(axiosTMDB3, searchString);
          searchResults = searchResults.data;
      
      yield put(actions.getSearchbarResultsSuccess({ results: searchResults, hasLooped, page, searchString }));
      
      const resultsLength = yield select(state => state.search.searchResults.length),
            maxPage       = yield select(state => state.search.maxPage),
            loopAgain     = (1 * listLength > resultsLength) && maxPage > page;
            
      if(!loopAgain || page >= maxPage) {
        break;
      }

      page++;
      maxIterations--;
      hasLooped = true;
    }
  } catch(error) {
    yield put(actions.getSearchbarResultsFail(error));
  }
}

export function* changeSearchListSaga(action) {
  try {
    let hasLooped     = false,
        maxIterations = 5;
    const { direction } = action;
    const listLength = yield select(state => state.app.listLength);

    while(maxIterations > 0) {
      const prevPage = yield select(state => state.search.page);
      
      yield put(actions.changeSearchListStart(direction, hasLooped));
      
      const newPage       = yield select(state => state.search.page),
            searchString  = yield select(state => state.search.searchString);
            
      if(direction === 'right' && (newPage > prevPage || hasLooped)) {
        let nextPageData = yield call(axiosTMDB3, searchString);
        yield put(actions.changeSearchListSuccess(nextPageData.data, direction));
      } else {
        yield put(actions.changeSearchListSuccess(-1, direction));
      }

      const { showPage, resultsLength, maxPage } = yield all ({
        showPage: select(state => state.search.showPage),
        resultsLength : select(state => state.search.searchResults.length),
        maxPage: select(state => state.search.maxPage)
      });

      const loopAgain = showPage*listLength > resultsLength;            
            
      if(!loopAgain || newPage >= maxPage) {
        break;
      }
      hasLooped = true;
      maxIterations--;
    }
  } catch (error) {
    yield put(actions.changeSearchListFail(error));
  }
}