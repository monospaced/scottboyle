import { IndexLink } from "react-router";
import React from "react";

import "./Logotype.css";

const Logotype = ({ subtitle, title }) => {
  return (
    <h1 className="Logotype">
      <IndexLink className="Logotype-link" to="/">
        {title} <strong className="Logotype-subtitle">{subtitle}</strong>
      </IndexLink>
    </h1>
  );
};

export default Logotype;
