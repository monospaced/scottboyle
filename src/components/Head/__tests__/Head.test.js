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

  it("renders provided helmet tags", () => {
    const helmet = {
      link: { toComponent: () => <link rel="canonical" href={`${data.url}/`} /> },
      meta: { toComponent: () => <meta name="description" content={data.description} /> },
      title: { toComponent: () => <title>{data.title}</title> },
    };

    const html = renderToStaticMarkup(<Head helmet={helmet} />);

    expect(html).toContain(`<title>${data.title}</title>`);
    expect(html).toContain(`content="${data.description}"`);
    expect(html).toContain(`href="${data.url}/"`);
  });
});
