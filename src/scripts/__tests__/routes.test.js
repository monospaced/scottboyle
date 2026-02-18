import { createMemoryHistory, Router } from "react-router";
import React from "react";
import { HelmetProvider } from "react-helmet-async";
import ReactRouterToArray from "react-router-to-array";
import renderer from "react-test-renderer";

import routes from "../routes";

jest.mock("../data");

describe("Routes", () => {
  it("should convert correctly to an array", () => {
    const array = renderer.create(ReactRouterToArray(routes)).toJSON();
    expect(array).toMatchSnapshot();
  });

  it("should force trailing slashes on urls", () => {
    const history = createMemoryHistory("/foo");
    const router = renderer.create(
      <HelmetProvider>
        <Router history={history} routes={routes} />
      </HelmetProvider>,
    );
    expect(history.getCurrentLocation().pathname).toBe("/foo/");
    history.push("/bar");
    expect(history.getCurrentLocation().pathname).toBe("/bar/");
  });
});
