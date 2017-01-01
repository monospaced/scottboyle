import React, {Component} from 'react';
import {Link} from 'react-router';
import './Nav.css';

const Nav = ({projects, routes}) => {
  const path = routes[routes.length - 1].path;
  return (
    <nav className="Nav">
      <ul className="Nav-list">
        {Object.keys(projects).map((key) => {
          const title = projects[key].title;
          return (
            <li key={key}>
              {key === path ? title : <Link to={`/${key}/`}>{title}</Link>}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

module.exports = Nav;
