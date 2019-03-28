import * as actionTypes from '../actions/actionTypes';
import * as u from '../Utility/index';

const initialState = {
  imgConfig: null,
  loadingInit: false,
  loadingAuth: false,
  loginImages: [],
  loggedIn: false,
  error: null,
  authType: null,
  requesting: false
};

// ON LOGIN PAGE LOAD
const getLoginInitStart = (state, action) => {
  return { ...state, loadingInit: true, imgConfig: action.imgConfig };
};

const getLoginInitSuccess = (state, action) => {
  const { response }  = action,
        { imgConfig } = state;

  let filteredResponse  = u.filterByVideoData(response.results, 'langImg'),
      baseBackdropUrl   = [u.getBaseUrl(imgConfig, 'backdrop', 2)],
      updatedResponse   = u.updateInitData(filteredResponse, baseBackdropUrl),
      loginImages       = updatedResponse.map(result => result.backdrop_path);
  
  return { ...state, loadingInit: false, loginImages };
};

const getLoginInitFail = (state, action) => {
  return { ...state, loadingInit: false, error: action.error };
};

// AUTH

const loginStart = (state, action) => {
  return { ...state, loadingAuth: true };
};

const loginRequesting = (state, action) => {
  return { ...state, requesting: true };
};

const loginSuccess = (state, action) => {
  return { ...state, loggedIn: true, requesting: false, loadingAuth: false, authType: action.authType};
};

const loginUnapproved = (state, action) => {
  return { ...state, loggedIn: false, requesting: false, loadingAuth: false };
}

const loginFail = (state, action) => {
  return { ...state, loggedIn: false, requesting: false, loadingAuth: false, error: action.error };
};

// LOGOUT
const logoutSuccess = (state, action) => {
  return { ...state, loggedIn: false, loadingAuth: false, authType: null };
}

const logoutFail = (state, action) => {
  return { ...state, loggedIn: false, loadingAuth: false, authType: null, error: action.error };
}

// =========================== //
//           REDUCER           //
// =========================== //
const reducer = u.createReducer(initialState, {
  [actionTypes.GET_LOGIN_INIT_START]: getLoginInitStart,
  [actionTypes.GET_LOGIN_INIT_SUCCESS]: getLoginInitSuccess,
  [actionTypes.GET_LOGIN_INIT_FAIL]: getLoginInitFail,
  [actionTypes.LOGIN_START]: loginStart,
  [actionTypes.LOGIN_REQUESTING]: loginRequesting,
  [actionTypes.LOGIN_SUCCESS]: loginSuccess,
  [actionTypes.LOGIN_UNAPPROVED]: loginUnapproved,
  [actionTypes.LOGIN_FAIL]: loginFail,
  [actionTypes.LOGOUT_SUCCESS]: logoutSuccess,
  [actionTypes.LOGOUT_FAIL]: logoutFail
});

export default reducer;