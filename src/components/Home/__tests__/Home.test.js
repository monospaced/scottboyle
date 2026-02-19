import React from "react";
import { render, screen } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";

import data from "../../../scripts/__mocks__/data.js";
import Home from "../Home.js";

describe("Home component", () => {
  const { about, description, subtitle, title, url } = data;

  it("renders avatar and about content", () => {
    const props = {
      data: { about, description, subtitle, title, url },
    };

    render(
      <HelmetProvider>
        <Home {...props} />
      </HelmetProvider>,
    );

    expect(screen.getByRole("heading", { level: 2, name: "About" })).toBeTruthy();
    expect(screen.getByRole("img", { name: "About" })).toBeTruthy();
    expect(screen.getByText("Test bio for mocks.")).toBeTruthy();
    expect(screen.getByText("Item one")).toBeTruthy();
  });
});
