import React from "react";
import "./Header.css";
import Logotype from "../Logotype/Logotype";

const Header = ({ title, subtitle }) => {
  return (
    <header className="Header" role="banner">
      <Logotype title={title} subtitle={subtitle} />
    </header>
  );
};

export default Header;
