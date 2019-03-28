import * as actionTypes from './actionTypes';

// ================================= //
//           FETCHING MOVIES         //
// ================================= //
export const fetchMoviesInit = () => {
  return { type: actionTypes.FETCH_MOVIES_INIT };
}

export const fetchMoviesStart = ({listLength, imgConfig, movieGenres, showPage}) => {
  return { type: actionTypes.FETCH_MOVIES_START, listLength, imgConfig, movieGenres, showPage };
}

export const fetchMoviesInitSuccess = (fetchedMovies, { hasLooped, loopAgain, page, searchString }) => {
  return { type: actionTypes.FETCH_MOVIES_INIT_SUCCESS, fetchedMovies, hasLooped, loopAgain, page, searchString };
}

export const fetchMoviesInitFail = (error) => {
  return { type: actionTypes.FETCH_MOVIES_INIT_FAIL, error };
}

// ================================= //
//        CHANGING MOVIE LIST        //
// ================================= //
export const changeMovieList = (direction, category) => {
  return { type: actionTypes.CHANGE_MOVIE_LIST, direction, category };
}

export const changeMovieListStart = ({direction, hasLooped, category}) => {
  return { type: actionTypes.CHANGE_MOVIE_LIST_START, direction, hasLooped, category };
}

export const changeMovieListSuccess = (newData, direction, category) => {
  return { type: actionTypes.CHANGE_MOVIE_LIST_SUCCESS, newData, direction, category };
}

export const changeMovieListFail = (error, category) => {
  return { type: actionTypes.CHANGE_MOVIE_LIST_FAIL, error, category };
}


// ================================= //
//            MOVIE DETAILS          //
// ================================= //

export const getMovieDetailsStart = ({imgConfig}) => {
  return { type: actionTypes.GET_MOVIE_DETAILS_START, imgConfig }
}

export const getMovieDetails = (movieId) => {
  return { type: actionTypes.GET_MOVIE_DETAILS, movieId }
}

export const getMovieDetailsSuccess = (fetchedDetails) => {
  return { type: actionTypes.GET_MOVIE_DETAILS_SUCCESS, fetchedDetails }
}

export const getMovieDetailsFail = (error) => {
  return { type: actionTypes.GET_MOVIE_DETAILS_FAIL, error }
}

export const clearMovieDetails = () => {
  return { type: actionTypes.CLEAR_MOVIE_DETAILS }
}

export const resetTranslateMovie = () => {
  return { type: actionTypes.RESET_TRANSLATE_MOVIE }
}

// ================================= //
//              CAROUSEL             //
// ================================= //
export const changeCarouselMovie = (movieId, element) => {
  return { type: actionTypes.CHANGE_CAROUSEL_MOVIE, movieId, element };
}

export const changeCarouselMovieArrow = (arrowDirection, element, showLength) => {
  return { type: actionTypes.CHANGE_CAROUSEL_MOVIE_ARROW, arrowDirection, element, showLength };
}

export const resizeCarouselSlide = (element) => {
  return { type: actionTypes.RESIZE_CAROUSEL_SLIDE, element };
}