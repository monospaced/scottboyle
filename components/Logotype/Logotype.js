import React from 'react';
import {IndexLink} from 'react-router';
import './Logotype.css';

const Logotype = ({title, subtitle}) => {
  return (
    <h1 className="Logotype">
      <IndexLink to="/" className="Logotype-link">
        {title} <strong className="Logotype-subtitle">{subtitle}</strong>
      </IndexLink>
    </h1>
  );
};

export default Logotype;
