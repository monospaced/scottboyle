import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from '../components/App/App.js';
import Index from '../components/Index/Index.js';
import Project from '../components/Project/Project.js';
import data from './data.js';

const Routes = (
  <Route path="/" component={App} data={data} >
    <IndexRoute component={Index} />
    {Object.keys(data.projects).map((key) => <Route path={key} component={Project} key={key} />)}
  </Route>
);

module.exports = Routes;
