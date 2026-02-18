import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Logotype from "../Logotype.js";

describe("Logotype component", () => {
  it("renders a homepage link with title and subtitle", () => {
    render(
      <MemoryRouter
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      >
        <Logotype subtitle="Subtitle" title="Title" />
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { level: 1 })).toBeTruthy();
    expect(
      screen
        .getByRole("link", { name: /title subtitle/i })
        .getAttribute("href"),
    ).toBe("/");
  });
});
