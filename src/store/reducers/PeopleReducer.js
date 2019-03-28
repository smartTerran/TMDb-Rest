import * as actionTypes from '../actions/actionTypes';
import * as u from '../Utility/index';
import * as util from '../../shared/Utility';

const initialState = {
  imgConfig: null,
  genres: null,
  profile: null,
  loadingInit: false
}

const getPersonDetailsStart = (state, action) => {
  return { ...state, loadingInit: true, imgConfig: action.imgConfig, genres: action.genres };
};

const getPersonDetailsSuccess = (state, action) => {
  const { personDetails: details } = action;
  const { imgConfig, genres } = state;
  
  let gender = null;
  if(details.gender) {
    if(details.gender === 0) {
      gender = 'Unspecified';
    } else if(details.gender === 1) {
      gender = 'Female';
    } else {
      gender = 'Male';
    }
  }

  const basePosterUrl = u.getBaseUrl(imgConfig, 'poster', 1);
  const baseUrl       = [null, basePosterUrl];
  let updatedWork     = null;
  if(util.isArrayGT(details.known_for_work, 0)) {
    updatedWork = u.updateInitData(details.known_for_work, baseUrl, genres);
  }
  
  const profile = {
    aka: [...details.also_known_as],
    bio: details.biography,
    birthday: details.birthday,
    deathday: details.deathday,
    backdrop: details.film_backdrop_path,
    gender: gender,
    department: details.known_for_department,
    work: updatedWork,
    name: details.name,
    birthPlace: details.place_of_birth,
    profilePicture: details.profile_path
  };
  
  return { ...state, loadingInit: false, profile };
};

const getPersonDetailsFail = (state, action) => {
  return { ...state, loadingInit: false };
};

const clearPersonDetails = (state, action) => {
  return { ...state, profile: null };
};

const reducer = u.createReducer(initialState, {
  [actionTypes.GET_PERSON_DETAILS_START]: getPersonDetailsStart,
  [actionTypes.GET_PERSON_DETAILS_SUCCESS]: getPersonDetailsSuccess,
  [actionTypes.GET_PERSON_DETAILS_FAIL]: getPersonDetailsFail,
  [actionTypes.CLEAR_PERSON_DETAILS]: clearPersonDetails
});

export default reducer;
