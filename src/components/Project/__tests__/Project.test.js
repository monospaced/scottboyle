import React from "react";
import { shallow } from "enzyme";

import data from "../../../scripts/__mocks__/data.js";
import Project from "../Project.js";

describe("Project component", () => {
  const { description, projects, subtitle, title } = data;

  it("should render correctly", () => {
    const props = {
      data: { description, projects, subtitle, title },
      route: {},
    };
    Object.keys(projects).map(key => {
      props.route.path = key;
      const component = shallow(<Project {...props} />);
      expect(component).toMatchSnapshot();
    });
  });
});
