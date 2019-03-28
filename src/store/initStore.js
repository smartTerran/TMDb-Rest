import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers/index';
import rootSaga from './sagas/index';

export default function initStore() {
  const sagaMiddleware  = createSagaMiddleware();
  const middleWare      = applyMiddleware(sagaMiddleware);
  const store           = createStore(rootReducer, middleWare);

  sagaMiddleware.run(rootSaga);
  return store;
}