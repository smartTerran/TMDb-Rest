import * as actions from '../actions/LoginActions';
import * as actionsProfile from '../actions/ProfileActions';
import { put, call, select } from 'redux-saga/effects';
import { axiosTMDB3 } from '../../shared/AxiosMovieAPI';
import * as u from '../../shared/Utility';

// ON LOGIN PAGE LOAD
export function* getLoginInitSaga(action) {
  try {
    const imgConfig = yield select(state => state.app.imgConfig);
    yield put(actions.getLoginInitStart(imgConfig));

    let searchString = ['/trending/all/week?api_key=779c2c54e0eadd69f922e2be042fc737'].join('');

    const response = yield call(axiosTMDB3, searchString);

    yield put(actions.getLoginInitSuccess(response.data));    
  } catch (error) {
    yield put(actions.getLoginInitFail(error));    
  }
}

// LOGGING IN 
export function* loginSaga(action) {
  const { authType: type } = action;

  yield put(actions.loginStart());
  yield call([localStorage, 'removeItem'], 'session');

  try {
    if(type === 'guest') {
      const searchString = ['/authentication/guest_session/new?api_key=779c2c54e0eadd69f922e2be042fc737'].join('');

      let guestSession = yield call(axiosTMDB3, searchString);
      guestSession.data.type = 'guest';
      guestSession.data.expires_at = Date.parse(guestSession.data.expires_at);

      yield call([localStorage, 'setItem'], 'session', JSON.stringify(guestSession.data));
      yield put(actions.loginSuccess(type));
    } else if(type === 'login') {
      const searchString = ['/authentication/token/new?api_key=779c2c54e0eadd69f922e2be042fc737'].join('');

      let session = yield call(axiosTMDB3, searchString);

      yield put(actions.loginRequesting());
      let win = yield call([window, 'open'],`https://www.themoviedb.org/authenticate/${session.data.request_token}?redirect_to=https://www.filmbase.xyz/login`);
      win.focus();
    } 
  } catch (error) {
    yield put(actions.loginFail(error));
  }
}

export function* loginApprovedSaga(action) {
  try {
    const createSessionString = ['/authentication/session/new?api_key=779c2c54e0eadd69f922e2be042fc737'].join('');
    const createSessionResponse = yield call([axiosTMDB3, 'post'], createSessionString, { request_token: action.token });

    createSessionResponse.data.expires_at = Date.now() + u.HtoMS(12);
    createSessionResponse.data.type = 'login';
    yield call([localStorage, 'setItem'], 'session', JSON.stringify(createSessionResponse.data));
    yield put(actions.loginSuccess('login'));
  } catch (error) {
    yield put(actions.loginFail(error));    
  }
}

export function* logoutSaga(action) {
  try {
    let session = yield call([localStorage, 'getItem'], 'session');
    if(session) {
      session = JSON.parse(session);
      if(session.type === 'login') {
        yield call([axiosTMDB3, 'delete'], ['/authentication/session?api_key=779c2c54e0eadd69f922e2be042fc737'].join(''), {data: {session_id: session.session_id}}); 
      }
      yield call([localStorage, 'removeItem'], 'session');
    }
    yield put(actionsProfile.clearProfileData());
    yield put(actions.logoutSuccess());
  } catch (error) {
    yield put(actions.logoutFail(error));
  }
}