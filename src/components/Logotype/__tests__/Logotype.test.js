import React from "react";
import { render } from "enzyme";

import Logotype from "../Logotype.js";

describe("Logotype component", () => {
  it("should render correctly", () => {
    const component = render(<Logotype subtitle="Subtitle" title="Title" />);
    expect(component).toMatchSnapshot();
  });
});
