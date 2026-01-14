import { Link } from "react-router";
import React from "react";

import "./Nav.css";

const Nav = ({ projects, routes }) => {
  const path = routes[routes.length - 1].path;

  return (
    <nav className="Nav">
      <h2 className="Nav-heading">Blog</h2>
      <p className="Nav-linklog" translate="no">
        <Link to={`/linklog/`} aria-current={path === "linklog" ? "page" : null}>
          Linklog
        </Link>
      </p>
      <h2 className="Nav-heading">Work</h2>
      <ul className="Nav-list">
        {Object.keys(projects).map(key => {
          const title = projects[key].title;

          return (
            <li key={key} translate="no">
              <Link to={`/${key}/`} aria-current={path === key ? "page" : null}>
                {title}
              </Link>
            </li>
          );
        })}
      </ul>
      <p>© {new Date().getFullYear()}</p>
    </nav>
  );
};

export default Nav;
