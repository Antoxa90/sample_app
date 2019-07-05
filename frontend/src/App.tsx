import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import MainPage from './components/MainPage';
import history from './utils/browserHistory';

const App = () => (
  <Router history={ history }>
    <Switch>
      <Route exact path='/' component={ MainPage }/>
    </Switch>
  </Router>
);

export default App;
