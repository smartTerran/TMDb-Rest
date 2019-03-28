import * as actionTypes from './actionTypes';

// ================================= //
//           PEOPLE DETAILS          //
// ================================= //
export const getPersonDetailsStart = (imgConfig, genres) => {
  return { type: actionTypes.GET_PERSON_DETAILS_START, imgConfig, genres }
}

export const getPersonDetails = (personId, backdrop) => {
  return { type: actionTypes.GET_PERSON_DETAILS, personId, backdrop }
}

export const getPersonDetailsSuccess = (personDetails) => {
  return { type: actionTypes.GET_PERSON_DETAILS_SUCCESS, personDetails }
}

export const getPersonDetailsFail = (error) => {
  return { type: actionTypes.GET_PERSON_DETAILS_FAIL, error }
}

export const clearPersonDetails = () => {
  return { type: actionTypes.CLEAR_PERSON_DETAILS }
}