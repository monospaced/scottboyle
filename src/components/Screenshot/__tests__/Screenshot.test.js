import { mount } from "enzyme";
import React from "react";

import data from "../../../scripts/__mocks__/data.js";
import Screenshot from "../Screenshot.js";

describe("Screenshot component", () => {
  const { projects } = data;

  it("should render correctly", () => {
    Object.keys(projects).map(key => {
      const component = mount(
        <Screenshot project={projects[key]} slug={key} />,
      );
      expect(component).toMatchSnapshot();
    });
  });

  it("should handle image load event correctly", () => {
    Object.keys(projects).map(key => {
      const component = mount(
        <Screenshot project={projects[key]} slug={key} />,
      );
      component.instance().imageDidLoad();
      expect(component.state("loaded")).toBe(true);
    });
  });

  it("should handle re-rendering with an identical slug", () => {
    const key = Object.keys(projects)[0];
    const component = mount(<Screenshot project={projects[key]} slug={key} />);
    component.setProps({ slug: key });
    expect(component.state("slug")).toBe(key);
  });
});
