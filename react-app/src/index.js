import React from 'react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import rootSaga from './sagas'
import rootReducer from './reducers'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'
import { Router } from "react-router-dom";
import history from "./history";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware( sagaMiddleware, logger));

sagaMiddleware.run(rootSaga);

render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>,
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
