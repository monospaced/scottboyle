import React from "react";
import { render } from "enzyme";

import Visit from "../Visit.js";

describe("Visit component", () => {
  it("should render correctly", () => {
    const component = render(<Visit project={{}} />);
    expect(component).toMatchSnapshot();
  });

  it("should render a link", () => {
    const component = render(
      <Visit project={{ link: "https://site.com", title: "Site" }} />,
    );
    expect(component).toMatchSnapshot();
  });
});
