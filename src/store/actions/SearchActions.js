import * as actionTypes from './actionTypes';

// ================================= //
//          SEARCHBAR QUERY          //
// ================================= //
export const getSearchbarResults = (queryParams) => {
  return { type: actionTypes.GET_SEARCHBAR_RESULTS, queryParams };
}

export const getSearchbarResultsStart = ({showPage, listLength, imgConfig}) => {
  return { type: actionTypes.GET_SEARCHBAR_RESULTS_START, showPage, listLength, imgConfig };
}

export const getSearchbarResultsSuccess = ({results, hasLooped, page, searchString}) => {
  return { type: actionTypes.GET_SEARCHBAR_RESULTS_SUCCESS, results, hasLooped, page, searchString };
}

export const getSearchbarResultsFail = (error) => {
  return { type: actionTypes.GET_SEARCHBAR_RESULTS_FAIL, error };
}

// CHANGE LIST //
export const changeSearchList = (direction) => {
  return { type: actionTypes.CHANGE_SEARCH_LIST, direction };
}

export const changeSearchListStart = (direction, hasLooped) => {
  return { type: actionTypes.CHANGE_SEARCH_LIST_START, direction, hasLooped };
}

export const changeSearchListSuccess = (newData, direction) => {
  return { type: actionTypes.CHANGE_SEARCH_LIST_SUCCESS, newData, direction };
}

export const changeSearchListFail = (error) => {
  return { type: actionTypes.CHANGE_SEARCH_LIST_FAIL, error };
}