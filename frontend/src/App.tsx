import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import MainPage from './components/MainPage';
import * as routes from './routes';
import './styles.scss';
import history from './utils/browserHistory';

const App = () => (
  <Router history={ history }>
    <Switch>
      <Route exact path={ routes.HOME } component={ MainPage }/>
    </Switch>
  </Router>
);

export default App;
