import * as actionTypes from '../actions/actionTypes';
import * as u from '../Utility';

const initialState = {
  imgConfig: null,
  movieGenres: null,
  tvGenres: null,
  listLength: 24,
  showLength: 7,
  error: null,
  loading: false,
  initLoaded: false
};

const fetchConfigInitStart = (state, action) => {
  return { ...state, loading: true };
}

const fetchConfigInitSuccess = (state, action) => {
  const imgConfig   = action.configData[0],
        movieGenres = action.configData[1],
        tvGenres    = action.configData[2];
  return { ...state, imgConfig, movieGenres, tvGenres, loading: false, initLoaded: true };
};

const fetchConfigInitFail = (state, action) => {
  return { ...state, error: action.error, loading: false }
};

const reducer = u.createReducer(initialState, {
  [actionTypes.FETCH_CONFIG_INIT_START]: fetchConfigInitStart,
  [actionTypes.FETCH_CONFIG_INIT_SUCCESS]: fetchConfigInitSuccess,
  [actionTypes.FETCH_CONFIG_INIT_FAIL]: fetchConfigInitFail,
});

export default reducer;