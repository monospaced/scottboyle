import { Link } from "react-router-dom";
import React from "react";

import "./Logotype.css";

const Logotype = ({ subtitle, title }) => {
  return (
    <h1 className="Logotype">
      <Link className="Logotype-link" to="/">
        <span translate="no">{title}</span>{" "}
        <strong className="Logotype-subtitle">{subtitle}</strong>
      </Link>
    </h1>
  );
};

export default Logotype;
