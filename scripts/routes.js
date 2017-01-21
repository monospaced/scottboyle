import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from '../components/App/App.js';
import Index from '../components/Index/Index.js';
import Project from '../components/Project/Project.js';
import Linklog from '../components/Linklog/Linklog.js';
import NotFound from '../components/NotFound/NotFound.js';
import data from './data.js';

const Routes = (
  <Route onEnter={forceTrailingSlash} onChange={forceTrailingSlashOnChange}>
    <Route path="/" component={App} data={data}>
      <IndexRoute component={Index}/>
      {Object.keys(data.projects).map((key) => <Route path={key} component={Project} key={key}/>)}
      <Route path="linklog" component={Linklog}/>
      <Route path="404" component={NotFound}/>
      <Route path="*" component={NotFound}/>
    </Route>
  </Route>
);

function forceTrailingSlash(nextState, replace) {
  const path = nextState.location.pathname;
  if (path.slice(-1) !== '/') {
    replace({
      ...nextState.location,
      pathname: path + '/',
    });
  }
}

function forceTrailingSlashOnChange(prevState, nextState, replace) {
  forceTrailingSlash(nextState, replace);
}

module.exports = Routes;
