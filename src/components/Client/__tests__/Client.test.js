import React from "react";
import { render } from "enzyme";

import Client from "../Client.js";

describe("Client component", () => {
  it("should render correctly", () => {
    const component = render(<Client client={{}} />);
    expect(component).toMatchSnapshot();
  });

  it("should render a name", () => {
    const component = render(<Client client={{ title: "Client" }} />);
    expect(component).toMatchSnapshot();
  });

  it("should render a link", () => {
    const component = render(
      <Client client={{ title: "Client", link: "https://client.com" }} />,
    );
    expect(component).toMatchSnapshot();
  });
});
