import React from "react";
import { shallow } from "enzyme";

import Root from "../Root.js";

jest.mock("../../../../package.json", () => ({ version: "0.0.0" }));

describe("Root component", () => {
  it("should render correctly", () => {
    const component = shallow(<Root meta={[]} router={<div class="App" />} />);
    expect(component).toMatchSnapshot();
  });
});
