import * as actionTypes from './actionTypes';

// ================================= //
//           FETCHING TV         //
// ================================= //
export const fetchTVInit = () => {
  return { type: actionTypes.FETCH_TV_INIT };
}

export const fetchTVStart = ({listLength, imgConfig, tvGenres, showPage}) => {
  return { type: actionTypes.FETCH_TV_START, listLength, imgConfig, tvGenres, showPage };
}

export const fetchTVInitSuccess = (fetchedTV, { hasLooped, loopAgain, page, searchString }) => {
  return { type: actionTypes.FETCH_TV_INIT_SUCCESS, fetchedTV, hasLooped, loopAgain, page, searchString };
}

export const fetchTVInitFail = (error) => {
  return { type: actionTypes.FETCH_TV_INIT_FAIL, error };
}

// ================================= //
//          CHANGING TV LIST         //
// ================================= //
export const changeTVList = (direction, category) => {
  return { type: actionTypes.CHANGE_TV_LIST, direction, category };
}

export const changeTVListStart = ({direction, hasLooped, category}) => {
  return { type: actionTypes.CHANGE_TV_LIST_START, direction, hasLooped, category };
}

export const changeTVListSuccess = (newData, direction, category) => {
  return { type: actionTypes.CHANGE_TV_LIST_SUCCESS, newData, direction, category };
}

export const changeTVListFail = (error, category) => {
  return { type: actionTypes.CHANGE_TV_LIST_FAIL, error, category };
}

// ================================= //
//            TV DETAILS          //
// ================================= //

export const getTVDetailsStart = () => {
  return { type: actionTypes.GET_TV_DETAILS_START }
}

export const getTVDetails = (tvId) => {
  return { type: actionTypes.GET_TV_DETAILS, tvId }
}

export const getTVDetailsSuccess = (fetchedDetails, config) => {
  return { type: actionTypes.GET_TV_DETAILS_SUCCESS, fetchedDetails, config }
}

export const getTVDetailsFail = (error) => {
  return { type: actionTypes.GET_TV_DETAILS_FAIL, error }
}

export const clearTVDetails = () => {
  return { type: actionTypes.CLEAR_TV_DETAILS }
}

export const resetTranslateTV = () => {
  return { type: actionTypes.RESET_TRANSLATE_TV }
}

// ================================= //
//              CAROUSEL             //
// ================================= //
export const changeCarouselTV = (tvId, element) => {
  return { type: actionTypes.CHANGE_CAROUSEL_TV, tvId, element };
}

export const changeCarouselTVArrow = (arrowDirection, element, showLength) => {
  return { type: actionTypes.CHANGE_CAROUSEL_TV_ARROW, arrowDirection, element, showLength };
}

export const resizeCarouselSlideTV = (element) => {
  return { type: actionTypes.RESIZE_CAROUSEL_SLIDE_TV, element };
}