import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

import Root from "../Root.js";

jest.mock("../../../../package.json", () => ({ version: "0.0.0" }));
jest.mock("../../Head/Head", () => () => <head data-testid="head" />);

describe("Root component", () => {
  it("renders document shell and router markup", () => {
    const router = { __html: '<div class="App"></div>' };
    const html = renderToStaticMarkup(<Root meta={[]} router={router} />);

    expect(html).toContain('<html lang="en-GB">');
    expect(html).toContain('<head data-testid="head"></head>');
    expect(html).toContain('<div id="router"><div class="App"></div></div>');
    expect(html).toContain('<script src="/bundle.js?v=0.0.0"></script>');
  });
});
