import * as actionTypes from './actionTypes';

// Ran when app loads initially
export const fetchConfigInit = () => {
  return { type: actionTypes.FETCH_CONFIG_INIT };
}

// Set loading to true
export const fetchConfigInitStart = () => {
  return { type: actionTypes.FETCH_CONFIG_INIT_START };
}

// Set loading to false and configData to state
export const fetchConfigInitSuccess = (configData) => {
  return { type: actionTypes.FETCH_CONFIG_INIT_SUCCESS, configData };
}

// Set loading to false
export const fetchConfigInitFail = (error) => {
  return { type: actionTypes.FETCH_CONFIG_INIT_FAIL, error };
}