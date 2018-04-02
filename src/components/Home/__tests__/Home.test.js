import React from "react";
import { shallow } from "enzyme";

import data from "../../../scripts/__mocks__/data.js";
import Home from "../Home.js";

describe("Home component", () => {
  const { about, description, subtitle, title } = data;

  it("should render correctly", () => {
    const props = {
      data: { about, description, subtitle, title },
    };
    const component = shallow(<Home {...props} />);
    expect(component).toMatchSnapshot();
  });
});
