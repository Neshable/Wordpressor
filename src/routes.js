import React from 'react';
import ReactDOM from 'react-dom';

// Import React Router
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

// Import Components
import { Wp, WpStats, Main, Welcome, Test } from './jsx/wp.jsx';
import envato from './jsx/envato.jsx';


const router = (
  <Router history={browserHistory}>
    <Route path="/" component={Main}>
      <IndexRoute component={Welcome} />
      <Route path="/wp-news" component={WpStats} />
      <Route path="/wp-themes" component={Wp} />
      <Route path="/wp-envato" component={envato} />
    </Route>
  </Router>
)

export default router;