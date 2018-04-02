import React from "react";
import { render } from "enzyme";

import Avatar from "../Avatar.js";

describe("Avatar component", () => {
  it("should render correctly", () => {
    const component = render(<Avatar />);
    expect(component).toMatchSnapshot();
  });
});
