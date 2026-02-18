import { Link } from "react-router-dom";
import React from "react";

import "./Nav.css";

const Nav = ({ currentPath, projects }) => {
  return (
    <nav className="Nav">
      <h2 className="Nav-heading">Blog</h2>
      <p className="Nav-linklog" translate="no">
        <Link
          to="/linklog/"
          aria-current={currentPath === "linklog" ? "page" : null}
        >
          Linklog
        </Link>
      </p>
      <h2 className="Nav-heading">Work</h2>
      <ul className="Nav-list">
        {Object.keys(projects).map((key) => {
          const title = projects[key].title;

          return (
            <li key={key} translate="no">
              <Link
                to={`/${key}/`}
                aria-current={currentPath === key ? "page" : null}
              >
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
