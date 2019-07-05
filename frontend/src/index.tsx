import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { batchDispatchMiddleware } from 'redux-batched-actions';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import immutableStateInvariantMiddleware from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import App from './App';
import rootReducer from './reducers';

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
