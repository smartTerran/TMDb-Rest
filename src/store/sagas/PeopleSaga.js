import * as actions from '../actions/PeopleActions';
import { put, all, call, select } from 'redux-saga/effects';
import { axiosTMDB3 } from '../../shared/AxiosMovieAPI';

export function* getPersonDetailsSaga(action) {
  const { personId, backdrop } = action;
  const [imgConfig, movieGenres, tvGenres] = yield all([
    select(state => state.app.imgConfig),
    select(state => state.app.movieGenres),
    select(state => state.app.tvGenres)
  ]);

  const genres = movieGenres.concat(tvGenres);

  try {
    yield put(actions.getPersonDetailsStart(imgConfig, genres));
    const [personDetails, combinedCredits] = yield all([
      call(axiosTMDB3, ['/person/', personId,'?api_key=779c2c54e0eadd69f922e2be042fc737', '&language=en-US'].join('')),
      call(axiosTMDB3, ['/person/', personId, '/combined_credits?api_key=779c2c54e0eadd69f922e2be042fc737', '&language=en-US'].join(''))
    ]);

    personDetails.data.known_for_work = combinedCredits.data.cast.slice(0, 15);
    personDetails.data.film_backdrop_path = backdrop;
    personDetails.data.profile_path = [imgConfig.secure_base_url, imgConfig.profile_sizes[1], personDetails.data.profile_path].join('');

    yield put(actions.getPersonDetailsSuccess(personDetails.data));
  } catch (error) {
    yield put(actions.getPersonDetailsFail(error));
  }
}