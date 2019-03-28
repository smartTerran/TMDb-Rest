import * as actionTypes from './actionTypes';

// INIT LOGIN
export const getProfileInit = () => {
  return { type: actionTypes.GET_PROFILE_INIT };
}

export const getProfileInitStart = (imgConfig) => {
  return { type: actionTypes.GET_PROFILE_INIT_START, imgConfig };
}

export const getProfileInitSuccess = (profileData) => {
  return { type: actionTypes.GET_PROFILE_INIT_SUCCESS, profileData };
}

export const getProfileInitFail = (error) => {
  return { type: actionTypes.GET_PROFILE_INIT_FAIL, error };
}

// UPDATE PROFILE FOR NEW DATA
export const updateProfile = () => {
  return { type: actionTypes.UPDATE_PROFILE };
}

export const updateProfileSuccess = (updatedData) => {
  return { type: actionTypes.UPDATE_PROFILE_SUCCESS, updatedData };
}

export const updateProfileFail = (error) => {
  return { type: actionTypes.UPDATE_PROFILE_FAIL, error };
}

// CLEAR DATA FROM STORE
export const clearProfileData = () => {
  return { type: actionTypes.CLEAR_PROFILE_DATA };
}

// SUBMIT OR FAVORITE FILM
export const submitRating = (filmType, id, rating) => {
  return { type: actionTypes.SUBMIT_RATING, filmType, id, rating };
}

export const favoriteFilm = (filmType, id) => {
  return { type: actionTypes.FAVORITE_FILM, filmType, id };
}

export const favOrRateSuccess = (response, actionType, makeFavorite) => {
  return { type: actionTypes.FAV_OR_RATE_SUCCESS, response, actionType, makeFavorite };
}

export const favOrRateFail = (error) => {
  return { type: actionTypes.FAV_OR_RATE_FAIL, error };
}

export const clearValidationMessage = () => {
  return { type: actionTypes.CLEAR_VALIDATION_MESSAGE };
}