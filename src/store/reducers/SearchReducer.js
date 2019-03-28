import * as actionTypes from '../actions/actionTypes';
import * as u from '../Utility/index';

const initialState = {
  imgConfig: null,
  listLength: null,
  showPage: null,
  maxPage: null,
  loadingInit: false,
  loading: false,
  searchString: '',
  searchResults: [],
  totalResults: null,
  error: null,
};

// SEARCHBAR
const getSearchbarResultsStart = (state, action) => {
  const {showPage, listLength, imgConfig} = action;
  return { ...state, loadingInit: true, showPage, listLength, imgConfig };
}

const getSearchbarResultsSuccess = (state, action) => {
  const { results, total_pages: maxPage, total_results: totalResults } = action.results,
        { searchString, page, hasLooped } = action,
        { imgConfig, searchResults: stateResults, showPage, listLength } = state,
        baseUrlPoster = u.getBaseUrl(imgConfig, 'poster', 1),
        baseUrl       = [null, baseUrlPoster];
        
  let searchResults = u.filterByVideoData(results, 'search');
  searchResults     = u.updateInitData(searchResults, baseUrl);
  
  if(hasLooped) {
    searchResults = stateResults.concat(searchResults);
    searchResults = u.removeDuplicateById(searchResults);
  }

  const loadingInit = showPage * listLength > searchResults.length && page < maxPage;
  return { ...state, totalResults, searchResults, page, maxPage, loadingInit, searchString };
}

const getSearchbarResultsFail = (state, action) => {
  return { ...state, error: action.error, loadingInit: false };
}

// CHANGE LIST 
const changeSearchListStart = (state, action) => {
  const { direction, hasLooped } = action;
  let   { searchResults, maxPage, listLength, searchString, showPage, page } = state;
  
  if(direction === 'left' && showPage > 1) {
    showPage--;
  } else if(direction === 'right') {
    const sliceStart  = showPage * listLength,
          sliceEnd    = (showPage+1) * listLength;
          
    if(!hasLooped && searchResults.slice(sliceStart, sliceEnd).length >= 0) {
      showPage++;
    }
    if(page < maxPage && (searchResults.slice(sliceStart, sliceEnd).length < listLength)) {
      page++;
      searchString = searchString.replace(/page=\d+(?=&?)/g, `page=${page}`);
    } 
  }

  return { ...state, page, showPage, searchString, loading: true };
};

const changeSearchListSuccess = (state, action) => {
  const direction = action.direction;
  const { imgConfig, searchResults } = state;

  if(direction === 'left' || action.newData === -1) {
    return { ...state, loading: false };
  }

  const newData       = action.newData.results,
        baseUrlPoster = u.getBaseUrl(imgConfig, 'poster', 1),
        baseUrl       = [null, baseUrlPoster];  

  let updatedResults = u.filterByVideoData(newData, 'langPosterImg');
      updatedResults = u.updateInitData(updatedResults, baseUrl);

  let combinedResults     = searchResults.concat(updatedResults),
      noDuplicateResults  = u.removeDuplicateById(combinedResults);

  return { ...state, searchResults: noDuplicateResults, loading: false };
};

const changeSearchListFail = (state, action) => {
  return { ...state, error: action.error, loading: false };
};

const reducer = u.createReducer(initialState, {
  [actionTypes.GET_SEARCHBAR_RESULTS_START]: getSearchbarResultsStart,
  [actionTypes.GET_SEARCHBAR_RESULTS_SUCCESS]: getSearchbarResultsSuccess,
  [actionTypes.GET_SEARCHBAR_RESULTS_FAIL]: getSearchbarResultsFail,
  [actionTypes.CHANGE_SEARCH_LIST_START]: changeSearchListStart,
  [actionTypes.CHANGE_SEARCH_LIST_SUCCESS]: changeSearchListSuccess,
  [actionTypes.CHANGE_SEARCH_LIST_FAIL]: changeSearchListFail
});

export default reducer;