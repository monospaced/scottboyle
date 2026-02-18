import React from "react";
import { render, screen } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";

import data from "../../../scripts/__mocks__/data.js";
import NotFound from "../NotFound.js";

describe("NotFound component", () => {
  const { subtitle, title } = data;

  it("renders the not found message", () => {
    const props = { data: { subtitle, title } };
    render(
      <HelmetProvider>
        <NotFound {...props} />
      </HelmetProvider>,
    );

    expect(
      screen.getByRole("heading", { name: /page not found/i }),
    ).toBeTruthy();
    expect(
      screen.getByText(/requested url was not found on this server/i),
    ).toBeTruthy();
  });
});
