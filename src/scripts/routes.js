import { IndexRoute, Route } from "react-router";
import React from "react";

import App from "../components/App/App.js";
import data from "./data.js";
import Home from "../components/Home/Home.js";
import Project from "../components/Project/Project.js";
import Linklog from "../components/Linklog/Linklog.js";
import NotFound from "../components/NotFound/NotFound.js";

const Routes = (
  <Route onChange={forceTrailingSlashOnChange} onEnter={forceTrailingSlash}>
    <Route component={App} data={data} path="/">
      <IndexRoute component={Home} />
      {Object.keys(data.projects).map(key => (
        <Route component={Project} key={key} path={key} />
      ))}
      <Route component={Linklog} path="linklog" />
      <Route component={NotFound} path="404" />
      <Route component={NotFound} path="*" />
    </Route>
  </Route>
);

function forceTrailingSlash(nextState, replace) {
  const path = nextState.location.pathname;

  if (path.slice(-1) !== "/") {
    replace({ ...nextState.location, pathname: path + "/" });
  }
}

function forceTrailingSlashOnChange(prevState, nextState, replace) {
  forceTrailingSlash(nextState, replace);
}

module.exports = Routes;
