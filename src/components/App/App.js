import React from "react";

import "./App.css";
import Header from "../Header/Header";
import Nav from "../Nav/Nav";

const App = ({ children, currentPath, data }) => {
  const { projects, subtitle, title } = data;

  return (
    <div className="App">
      <Header subtitle={subtitle} title={title} />
      {React.cloneElement(children, { data })}
      <Nav currentPath={currentPath} projects={projects} />
    </div>
  );
};

export default App;
