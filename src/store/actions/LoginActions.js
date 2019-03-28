import * as actionTypes from './actionTypes';

// LOGIN PAGE LOAD
export const getLoginInit = () => {
  return { type: actionTypes.GET_LOGIN_INIT };
}

export const getLoginInitStart = (imgConfig) => {
  return { type: actionTypes.GET_LOGIN_INIT_START, imgConfig };
}

export const getLoginInitSuccess = (response) => {
  return { type: actionTypes.GET_LOGIN_INIT_SUCCESS, response };
}

export const getLoginInitFail = (error) => {
  return { type: actionTypes.GET_LOGIN_INIT_FAIL, error };
}

// AUTH USER
export const login = (authType) => {
  return { type: actionTypes.LOGIN, authType };
}

export const loginStart = () => {
  return { type: actionTypes.LOGIN_START };
}

export const loginRequesting = () => {
  return { type: actionTypes.LOGIN_REQUESTING };
}

export const loginApproved = (token) => {
  return { type: actionTypes.LOGIN_APPROVED, token };
}

export const loginUnapproved = () => {
  return { type: actionTypes.LOGIN_UNAPPROVED };
}

export const loginSuccess = (authType) => {
  return { type: actionTypes.LOGIN_SUCCESS, authType };
}

export const loginFail = (error) => {
  return { type: actionTypes.LOGIN_FAIL, error };
}

// LOGOUT
export const logout = () => {
  return { type: actionTypes.LOGOUT };
}

export const logoutSuccess = () => {
  return { type: actionTypes.LOGOUT_SUCCESS };
}

export const logoutFail = (error) => {
  return { type: actionTypes.LOGOUT_FAIL, error };
}