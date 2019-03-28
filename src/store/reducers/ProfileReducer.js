import * as actionTypes from '../actions/actionTypes';
import * as u from '../Utility/index';

const initialState = {
  imgConfig: null,
  loadingInit: false,
  authType: null,
  accountId: null,
  profile: null,
  favorite: null,
  rated: null,
  validationMessages: [],
  error: null
};

// ON LOGIN
const getProfileInitStart = (state, action) => {
  return { ...state, loadingInit: true, imgConfig: action.imgConfig };
};

const getProfileInitSuccess = (state, action) => {
  let { authType, accountId, favoriteMovies, favoriteTV, ratedMovies, ratedTV, name, userName } = action.profileData;
  const { imgConfig, profile: existingProfile, validationMessages } = state;
  
  const baseUrlPoster = u.getBaseUrl(imgConfig, 'poster', 1),
        baseUrl       = [null, baseUrlPoster];
        
  if(authType === 'login') {
    favoriteMovies  = u.updateInitData(favoriteMovies, baseUrl);
    favoriteTV      = u.updateInitData(favoriteTV, baseUrl);
  }
  ratedMovies     = u.updateInitData(ratedMovies, baseUrl);
  ratedTV         = u.updateInitData(ratedTV, baseUrl);

  const profile   = { name, userName },
        favorite  = { movie: favoriteMovies, tv: favoriteTV },
        rated     = { movie: ratedMovies, tv: ratedTV };
  
  if(!existingProfile) {
    let message = `Welcome back ${userName}!`;
    let type    = 'success';
    let newMessage  = { message, type, id: Date.now(), duration: 5500 };

    return { ...state, loadingInit: false, accountId, authType, profile, favorite, rated, validationMessages: [...validationMessages, newMessage] };
  }
  
  return { ...state, loadingInit: false, accountId, authType, profile, favorite, rated };
};

const getProfileInitFail = (state, action) => {
  return { ...state, loadingInit: false, error: action.error };
};

// UPDATING DATA 
const updateProfileSuccess = (state, action) => {
  let { authType, favoriteMovies, favoriteTV, ratedMovies, ratedTV } = action.updatedData;
  const { imgConfig } = state;
  
  const baseUrlPoster = u.getBaseUrl(imgConfig, 'poster', 1),
        baseUrl       = [null, baseUrlPoster];
  
  if(authType === 'login') {
    favoriteMovies  = u.updateInitData(favoriteMovies, baseUrl);
    favoriteTV      = u.updateInitData(favoriteTV, baseUrl);
  }
  ratedMovies    = u.updateInitData(ratedMovies, baseUrl);
  ratedTV         = u.updateInitData(ratedTV, baseUrl);

  const favorite  = { movie: favoriteMovies, tv: favoriteTV },
        rated     = { movie: ratedMovies, tv: ratedTV };

  return { ...state, favorite, rated };
}

const updateProfileFail = (state, action) => {
  return { ...state, };
}

// CLEAR ON LOGOUT
const clearProfileData = (state, action) => {
  const validationMessages = [...state.validationMessages];

  let message = `Successfully logged out!`;
  let type    = 'danger';
  let newMessage  = { message, type, id: Date.now(), duration: 5500 };

  return { ...state, authType: null, accountId: null, profile: null, favorite: null, rated: null, validationMessages: [...validationMessages, newMessage] };
};

// FAVORITE OR RATE FILM
const favOrRateSuccess = (state, action) => {
  const { response, actionType, makeFavorite } = action,
        { response: responseBody } = response,
        { authType, validationMessages }  = state;

  let newMessage  = null,
      statusCode  = null,
      message     = null,
      type        = null;

  if(responseBody && responseBody.data) {
    statusCode = responseBody.data.status_code;
  }

  if(response && (response.status === 201 || response.status === 200)) {
    if(actionType === 'favorite') {
      message = makeFavorite ? 
        'Successfully added to your favorites!' : 
        'Successfully removed from your favorites!'; 
      type = makeFavorite ? 'success' : 'warning';
    } else {
      message = 'Successfully rated!';
      type    = 'success';
    }
    
    newMessage = { message, type, id: Date.now(), duration: 3500 };
    return { ...state, validationMessages: [...validationMessages, newMessage] };
  } else if(statusCode === 3) {
    if(authType === 'guest') {
      message = 'You must create an account to do that!';
      type    = 'warning';
    } else if(!authType) {
      message = 'You must be logged in to do that!';
      type    = 'danger';
    }

    newMessage = { message, type, id: Date.now(), duration: 3500 };
    return { ...state, validationMessages: [...validationMessages, newMessage] };
  } else {
    return { ...state };
  }
};

const favOrRateFail = (state, action) => {
  return { ...state, error: action.error };
};

const clearValidationMessage = (state, action) => {
  const updatedValidationList = state.validationMessages.slice(1);
  return { ...state, validationMessages: updatedValidationList };
}

const reducer = u.createReducer(initialState, {
  [actionTypes.GET_PROFILE_INIT_START]: getProfileInitStart,
  [actionTypes.GET_PROFILE_INIT_SUCCESS]: getProfileInitSuccess,
  [actionTypes.GET_PROFILE_INIT_FAIL]: getProfileInitFail,
  [actionTypes.UPDATE_PROFILE_SUCCESS]: updateProfileSuccess,
  [actionTypes.UPDATE_PROFILE_FAIL]: updateProfileFail,
  [actionTypes.CLEAR_PROFILE_DATA]: clearProfileData,
  [actionTypes.FAV_OR_RATE_SUCCESS]: favOrRateSuccess,
  [actionTypes.FAV_OR_RATE_FAIL]: favOrRateFail,
  [actionTypes.CLEAR_VALIDATION_MESSAGE]: clearValidationMessage
});

export default reducer;