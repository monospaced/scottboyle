import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Header from "../Header.js";

describe("Header component", () => {
  it("renders a banner landmark", () => {
    render(
      <MemoryRouter
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      >
        <Header subtitle="Subtitle" title="Title" />
      </MemoryRouter>,
    );

    expect(screen.getByRole("banner")).toBeTruthy();
  });
});
