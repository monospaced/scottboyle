import React from "react";
import { shallow } from "enzyme";

import Header from "../Header.js";

describe("Header component", () => {
  it("should render correctly", () => {
    const component = shallow(<Header />);
    expect(component).toMatchSnapshot();
  });
});
