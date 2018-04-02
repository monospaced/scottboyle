import React from "react";
import { render } from "enzyme";

import data from "../../../scripts/__mocks__/data.js";
import Nav from "../Nav.js";

describe("Nav component", () => {
  const { projects } = data;

  it("should render correctly", () => {
    const component = render(
      <Nav projects={projects} routes={[{ path: "" }]} />,
    );
    expect(component).toMatchSnapshot();
  });

  it("should render a project as the active item", () => {
    const component = render(
      <Nav projects={projects} routes={[{ path: Object.keys(projects)[0] }]} />,
    );
    expect(component).toMatchSnapshot();
  });

  it("should render linklog as the active item", () => {
    const component = render(
      <Nav projects={projects} routes={[{ path: "linklog" }]} />,
    );
    expect(component).toMatchSnapshot();
  });
});
