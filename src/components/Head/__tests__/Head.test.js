import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

import data from "../../../scripts/__mocks__/data.js";
import Head from "../Head.js";

jest.mock("../../../../package.json", () => ({ version: "0.0.0" }));

describe("Head component", () => {
  it("renders key metadata and assets", () => {
    const html = renderToStaticMarkup(<Head />);

    expect(html).toContain('name="theme-color"');
    expect(html).toContain('name="viewport"');
    expect(html).toContain('href="/manifest.webmanifest"');
    expect(html).toContain('href="/styles.css?v=0.0.0"');
  });
});
