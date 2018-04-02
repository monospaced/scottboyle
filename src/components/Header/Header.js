import React from "react";

import "./Header.css";
import Logotype from "../Logotype/Logotype";

const Header = ({ subtitle, title }) => {
  return (
    <header className="Header" role="banner">
      <Logotype subtitle={subtitle} title={title} />
    </header>
  );
};

export default Header;
