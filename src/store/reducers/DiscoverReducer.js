import * as actionTypes from '../actions/actionTypes';
import * as u from '../Utility/index';

const initialState = {
  imgConfig: null,
  listLength: null,
  loadingInit: false,
  loading: false,
  results: [],
  totalResults: null,
  page: null,
  maxPage: null,
  showPage: null,
  error: null,
  searchString: ''
};

// DISCOVER INIT
const getDiscoverInitStart = (state, action) => {
  const { page, showPage, listLength, imgConfig } = action;
  return { ...state, loadingInit: true, page, showPage, listLength, imgConfig };
};

const getDiscoverInitFail = (state, action) => {
  return { ...state, loadingInit: false, error: action.error };
};

// FILTER RESULT
const getDiscoverResultsStart = (state, action) => {
  return { ...state, loading: true, showPage: action.showPage };
};

const getDiscoverResultsSuccess = (state, action) => {
  const { results, total_pages: maxPage, total_results: totalResults } = action.results,
        { searchString, page, hasLooped } = action,
        { imgConfig, results: stateResults, showPage, listLength } = state,
        baseUrlPoster = u.getBaseUrl(imgConfig, 'poster', 1),
        baseUrl       = [null, baseUrlPoster];
        
  let updatedResults = u.filterByVideoData(results, 'langPosterImg');
  updatedResults = u.updateInitData(updatedResults, baseUrl);
  
  if(hasLooped) {
    updatedResults = stateResults.concat(updatedResults);
    updatedResults = u.removeDuplicateById(updatedResults);
  }
  
  const loading = showPage * listLength > updatedResults.length && page < maxPage;
  if(action.loadType === 'init') {
    const loadingInit = loading;
    return { ...state, totalResults, results: updatedResults, page, maxPage, loadingInit, searchString };
  } else if(action.loadType === 'filter') {
    return { ...state, totalResults ,results: updatedResults, page, maxPage, loading,  searchString };
  }
  
};

const getDiscoverResultsFail = (state, action) => {
  return { ...state, loading: false, error: action.error };
};

// CHANGE LIST 
const changeDiscoverListStart = (state, action) => {
  const { direction, hasLooped } = action;
  let   { results, maxPage, listLength, searchString, showPage, page } = state;
  
  if(direction === 'left' && showPage > 1) {
    showPage--;
  } else if(direction === 'right') {
    const sliceStart  = showPage * listLength,
          sliceEnd    = (showPage+1) * listLength;
          
    if(!hasLooped && results.slice(sliceStart, sliceEnd).length >= 0) {
      showPage++;
    }
    if(page < maxPage && (results.slice(sliceStart, sliceEnd).length < listLength)) {
      page++;
      searchString = searchString.replace(/page=\d+(?=&?)/g, `page=${page}`);
    } 
  }

  return { ...state, page, showPage, searchString, loading: true };
};

const changeDiscoverListSuccess = (state, action) => {
  const direction     = action.direction;
  if(direction === 'left' || action.newData === -1) {
    return { ...state, loading: false };
  }

  const newData       = action.newData.results,
        baseUrlPoster = u.getBaseUrl(state.imgConfig, 'poster', 1),
        baseUrl       = [null, baseUrlPoster];
  

  let updatedResults = u.filterByVideoData(newData, 'langPosterImg');
      updatedResults = u.updateInitData(updatedResults, baseUrl);

  let combinedResults     = state.results.concat(updatedResults),
      noDuplicateResults  = u.removeDuplicateById(combinedResults);

  return { ...state, results: noDuplicateResults, loading: false };
};

const changeDiscoverListFail = (state, action) => {
  return { ...state, error: action.error, loading: false };
};

// REDUCER //
const reducer = u.createReducer(initialState, {
  [actionTypes.GET_DISCOVER_INIT_START]: getDiscoverInitStart,
  [actionTypes.GET_DISCOVER_INIT_FAIL]: getDiscoverInitFail,
  [actionTypes.GET_DISCOVER_RESULTS_START]: getDiscoverResultsStart,
  [actionTypes.GET_DISCOVER_RESULTS_SUCCESS]: getDiscoverResultsSuccess,
  [actionTypes.GET_DISCOVER_RESULTS_FAIL]: getDiscoverResultsFail,
  [actionTypes.CHANGE_DISCOVER_LIST_START]: changeDiscoverListStart,
  [actionTypes.CHANGE_DISCOVER_LIST_SUCCESS]: changeDiscoverListSuccess,
  [actionTypes.CHANGE_DISCOVER_LIST_FAIL]: changeDiscoverListFail
});

export default reducer;