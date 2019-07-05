import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import { batchDispatchMiddleware } from 'redux-batched-actions';
import immutableStateInvariantMiddleware from 'redux-immutable-state-invariant';
import rootReducer from './reducers';
import App from './App';

// Variable from webpack define plugin
declare const DEV_MODE: boolean;

const middlewares = [thunk, batchDispatchMiddleware];

if (DEV_MODE) {
  middlewares.push( immutableStateInvariantMiddleware() );
}

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware( ...middlewares ),
  )
);

ReactDOM.render(
  <Provider store={ store }>
    <App/>
  </Provider>,
  document.getElementById( 'app' )
);