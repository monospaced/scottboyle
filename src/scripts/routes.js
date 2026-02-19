import React from "react";
import { Outlet, Route, Routes, useLocation } from "react-router-dom";

import App from "../components/App/App.js";
import data from "./data.js";
import Home from "../components/Home/Home.js";
import Project from "../components/Project/Project.js";
import Linklog from "../components/Linklog/Linklog.js";
import NotFound from "../components/NotFound/NotFound.js";

const projectKeys = Object.keys(data.projects);

const toCurrentPath = (pathname) => {
  // Trim outer slashes and take only the first segment:
  // "/alpha/" -> "alpha", "/alpha/beta/" -> "alpha".
  const [segment = ""] = pathname.replace(/^\/+|\/+$/g, "").split("/");
  return segment;
};

const AppLayout = () => {
  const location = useLocation();

  return (
    <App currentPath={toCurrentPath(location.pathname)} data={data}>
      <Outlet />
    </App>
  );
};

export const routePaths = ["/"]
  .concat(projectKeys.map((key) => `/${key}/`))
  .concat(["/linklog/", "/404/"]);

export const ensureTrailingSlashPath = (pathname) => {
  if (!pathname || pathname === "/") {
    return "/";
  }

  return pathname[pathname.length - 1] === "/" ? pathname : `${pathname}/`;
};

const AppRoutes = () => (
  <Routes>
    <Route element={<AppLayout />} path="/">
      <Route element={<Home data={data} />} index />
      {projectKeys.map((key) => (
        <Route
          element={<Project data={data} path={key} />}
          key={key}
          path={key}
        />
      ))}
      <Route element={<Linklog data={data} />} path="linklog" />
      <Route element={<NotFound data={data} />} path="404" />
      <Route element={<NotFound data={data} />} path="*" />
    </Route>
  </Routes>
);

export default AppRoutes;
