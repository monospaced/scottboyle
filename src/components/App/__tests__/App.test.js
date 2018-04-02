import React from "react";
import { shallow } from "enzyme";

import App from "../App.js";

describe("App component", () => {
  it("should render correctly", () => {
    const props = {
      route: { data: { subtitle: "", title: "", projects: [] } },
      routes: [],
    };
    const component = shallow(
      <App {...props}>
        <main class="Main" />
      </App>,
    );
    expect(component).toMatchSnapshot();
  });
});
