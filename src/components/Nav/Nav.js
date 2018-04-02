import { Link } from "react-router";
import React from "react";

import "./Nav.css";

const Nav = ({ projects, routes }) => {
  const path = routes[routes.length - 1].path;

  return (
    <nav className="Nav">
      <h2 className="Nav-heading">Work</h2>
      <ul className="Nav-list">
        {Object.keys(projects).map(key => {
          const title = projects[key].title;

          return (
            <li key={key}>
              {path === key ? title : <Link to={`/${key}`}>{title}</Link>}
            </li>
          );
        })}
        <li>
          {path === `linklog` ? (
            `Linklog`
          ) : (
            <Link to={`/linklog/`}>Linklog</Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
