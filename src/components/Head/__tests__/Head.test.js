import React from "react";
import { render } from "enzyme";

import data from "../../../scripts/__mocks__/data.js";
import Head from "../Head.js";

jest.mock("../../../../package.json", () => ({ version: "0.0.0" }));

describe("Head component", () => {
  it("should render correctly", () => {
    const component = render(<Head />);
    expect(component).toMatchSnapshot();
  });
});
