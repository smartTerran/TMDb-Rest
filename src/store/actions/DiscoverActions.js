import * as actionTypes from './actionTypes';

// ================================= //
//           DISCOVER QUERY          //
// ================================= //

export const getDiscoverInit = (queryParams) => {
  return { type: actionTypes.GET_DISCOVER_INIT, queryParams };
}

export const getDiscoverInitStart = ({showPage, listLength, imgConfig}) => {
  return { type: actionTypes.GET_DISCOVER_INIT_START, showPage, listLength, imgConfig };
}

export const getDiscoverInitFail = (error) => {
  return { type: actionTypes.GET_DISCOVER_INIT_FAIL, error };
}

// FILTER RESULTS //
export const getDiscoverResults = (queryParams) => {
  return { type: actionTypes.GET_DISCOVER_RESULTS, queryParams };
}

export const getDiscoverResultsStart = (showPage) => {
  return { type: actionTypes.GET_DISCOVER_RESULTS_START, showPage };
}

export const getDiscoverResultsSuccess = ({hasLooped, page, results, searchString, loadType}) => {
  return { type: actionTypes.GET_DISCOVER_RESULTS_SUCCESS, hasLooped, page, results, searchString, loadType };
}

export const getDiscoverResultsFail = (error) => {
  return { type: actionTypes.GET_DISCOVER_RESULTS_FAIL, error };
}

// CHANGE LIST //
export const changeDiscoverList = (direction) => {
  return { type: actionTypes.CHANGE_DISCOVER_LIST, direction };
}

export const changeDiscoverListStart = (direction, hasLooped) => {
  return { type: actionTypes.CHANGE_DISCOVER_LIST_START, direction, hasLooped };
}

export const changeDiscoverListSuccess = (newData, direction) => {
  return { type: actionTypes.CHANGE_DISCOVER_LIST_SUCCESS, newData, direction };
}

export const changeDiscoverListFail = (error) => {
  return { type: actionTypes.CHANGE_DISCOVER_LIST_FAIL, error };
}