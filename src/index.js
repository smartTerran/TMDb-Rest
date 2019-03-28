import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import initStore from './store/initStore';
import { LoadYoutube } from './shared/LoadYoutube';
import App from './App';
import './index.scss';
import * as serviceWorker from './serviceWorker';

window.addEventListener('DOMContentLoaded', LoadYoutube); 
const store = initStore();

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
serviceWorker.unregister();