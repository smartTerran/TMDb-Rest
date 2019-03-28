import * as actions from '../actions/ProfileActions';
import { put, call, select, all } from 'redux-saga/effects';
import { axiosTMDB3 } from '../../shared/AxiosMovieAPI';

export function* getProfileInitSaga(action) {
  const imgConfig = yield call(axiosTMDB3, '/configuration?api_key=779c2c54e0eadd69f922e2be042fc737');

  yield put(actions.getProfileInitStart(imgConfig.data.images));
  const session = JSON.parse(localStorage.getItem('session'));

  try {
    if(session.type === 'guest') {
      const pathStringTypes = {
        ratedMovies: '/rated/movies', 
        ratedTV: '/rated/tv'
      };
      const profileData = yield call(extractProfileData, session.type, pathStringTypes, {session});
      profileData.userName  = 'Guest';
      profileData.name      = 'Guest';
      profileData.authType  = 'guest';
      yield put(actions.getProfileInitSuccess(profileData));
      
    } else if(session.type === 'login') {
      const profileString = ['/account?api_key=779c2c54e0eadd69f922e2be042fc737','&session_id=', session.session_id].join('');

      const profileDetails  = yield call(axiosTMDB3, profileString),
            accountId       = profileDetails.data.id;

      const pathStringTypes = {
        favoriteMovies: '/favorite/movies', 
        favoriteTV: '/favorite/tv', 
        ratedMovies: '/rated/movies', 
        ratedTV: '/rated/tv'
      };

      const profileData = yield call(extractProfileData, session.type, pathStringTypes, {session, accountId});
      profileData.accountId = accountId;
      profileData.userName  = profileDetails.data.username;
      profileData.name      = profileDetails.data.name;
      profileData.authType  = 'login';
      yield put(actions.getProfileInitSuccess(profileData));
    }
  } catch (error) {
    yield put(actions.getProfileInitFail(error));
  }
}

export function* updateProfileSaga(action) {
  const session = JSON.parse(localStorage.getItem('session'));

  try {
    if(session.type === 'guest') {
      const pathStringTypes = {
        ratedMovies: '/rated/movies', 
        ratedTV: '/rated/tv'
      };
      const profileData = yield call(extractProfileData, session.type, pathStringTypes, {session});
      profileData.authType  = 'guest';

      yield put(actions.updateProfileSuccess(profileData));
    } else if(session.type === 'login') {
      const profileString = ['/account?api_key=779c2c54e0eadd69f922e2be042fc737','&session_id=', session.session_id].join('');

      const profileDetails  = yield call(axiosTMDB3, profileString),
            accountId       = profileDetails.data.id;

      const pathStringTypes = {
        favoriteMovies: '/favorite/movies', 
        favoriteTV: '/favorite/tv', 
        ratedMovies: '/rated/movies', 
        ratedTV: '/rated/tv'
      };

      const profileData = yield call(extractProfileData, session.type, pathStringTypes, {session, accountId});
      profileData.authType  = 'login';

      yield put(actions.updateProfileSuccess(profileData));
    }
  } catch (error) {
    yield put(actions.updateProfileFail(error));
  }
}

// UTILITY - getProfileInitSaga
function* extractProfileData(authType, pathStringTypes, ...rest) {
  const args        = rest[0],
        pathString  = {},
        profileData = {};

  if(authType === 'login') {
    for(let key in pathStringTypes) {
      pathString[key] = ['/account/', args.accountId, pathStringTypes[key], '?api_key=779c2c54e0eadd69f922e2be042fc737','&session_id=', args.session.session_id,'&language=en-US&sort_by=created_at.desc&page=1'].join('');
    }
  } else if(authType === 'guest') {
    for(let key in pathStringTypes) {
      pathString[key] = ['/guest_session/', args.session.guest_session_id, pathStringTypes[key], '?api_key=779c2c54e0eadd69f922e2be042fc737','&language=en-US&sort_by=created_at.desc&page=1'].join('');
    }
  }

  for(let key in pathString) {
    profileData[key] = yield call(getProfileData, pathString[key]);
  }
  return profileData;
}

function* getProfileData(pathString) {
  try {
    const result = yield call(axiosTMDB3, pathString);
    return result.data.results;
  } catch (error) {
    console.log(error);
  }
}
// UTILITY END - getProfileInitSaga

export function* submitRatingSaga(action) {
  const { filmType: type, id, rating } = action;
  let session = yield call([localStorage, 'getItem'], 'session');
  session = JSON.parse(session);
  
  try {
    let response = null;
    let authType = '';
    let sessionId = '';

    if(session) {
      authType  = session.type === 'guest' ? '&guest_session_id=' : '&session_id=';
      sessionId = session.type === 'guest' ? session.guest_session_id : session.session_id;
    }

    try {
      if(type === 'movie') {
        response = yield call([axiosTMDB3, 'post'], ['/movie/', id,'/rating?api_key=779c2c54e0eadd69f922e2be042fc737', authType, sessionId].join(''), {value: rating});
      } else if(type === 'tv') {
        response = yield call([axiosTMDB3, 'post'], ['/tv/', id,'/rating?api_key=779c2c54e0eadd69f922e2be042fc737', authType, sessionId].join(''), {value: rating});
      }
    } catch (error) {
      response = error;
    }

    if(response && response.status === 201) {
      yield put(actions.updateProfile());
    }

    yield put(actions.favOrRateSuccess(response, 'rated'));
    
  } catch (error) {
    yield put(actions.favOrRateFail(error));    
  }
}

export function* favoriteFilmSaga(action) {
  const { filmType, id } = action;
  let [accountId, favorite] = yield all ([
    select(state => state.profile.accountId),
    select(state => state.profile.favorite)
  ]);

  let session = yield call([localStorage, 'getItem'], 'session');
      session = JSON.parse(session);

  try {
    let response      = null,
        sessionId     = '',
        makeFavorite  = true;

    if(favorite && favorite[filmType] && favorite[filmType].find(film => film.id === id)) {
      makeFavorite = false;
    }

    if(session) {
      sessionId = session.type === 'guest' ? session.guest_session_id : session.session_id;
      sessionId = '&session_id=' + sessionId;
    } 
    
    accountId = accountId ? accountId : 'null';

    try {
      response = yield call([axiosTMDB3, 'post'], ['/account/', accountId,'/favorite?api_key=779c2c54e0eadd69f922e2be042fc737', sessionId].join(''), {
        media_type: filmType,
        media_id: id,
        favorite: makeFavorite
      });
    } catch (error) {
      response = error;
    }
    
    if(response && (response.status === 201 || response.status === 200)) {
      yield put(actions.updateProfile());
    }

    yield put(actions.favOrRateSuccess(response, 'favorite', makeFavorite));
  } catch (error) {
    yield put(actions.favOrRateFail(error));
  }
}