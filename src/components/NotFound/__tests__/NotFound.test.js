import React from "react";
import { shallow } from "enzyme";

import data from "../../../scripts/__mocks__/data.js";
import NotFound from "../NotFound.js";

describe("NotFound component", () => {
  const { subtitle, title } = data;

  it("should render correctly", () => {
    const props = { data: { subtitle, title } };
    const component = shallow(<NotFound {...props} />);
    expect(component).toMatchSnapshot();
  });
});
