import React from "react";
import { render, screen } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";

import AppRoutes, { ensureTrailingSlashPath, routePaths } from "../routes";

jest.mock("../data");

describe("Routes", () => {
  it("exports static site route paths", () => {
    expect(routePaths).toEqual([
      "/",
      "/alpha/",
      "/beta/",
      "/linklog/",
      "/404/",
    ]);
  });

  it("normalizes trailing slashes on urls", () => {
    expect(ensureTrailingSlashPath("/foo")).toBe("/foo/");
    expect(ensureTrailingSlashPath("/bar/")).toBe("/bar/");
    expect(ensureTrailingSlashPath("/")).toBe("/");
  });

  it("renders home route", () => {
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={["/"]}>
          <AppRoutes />
        </MemoryRouter>
      </HelmetProvider>,
    );

    expect(screen.getByText("Test bio for mocks.")).toBeTruthy();
  });

  it("renders project route with current nav state", () => {
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={["/alpha/"]}>
          <AppRoutes />
        </MemoryRouter>
      </HelmetProvider>,
    );

    expect(screen.getByText("Alpha project description.")).toBeTruthy();
    const currentProjectLink = screen
      .getAllByRole("link", { name: "Project Alpha" })
      .find((link) => link.getAttribute("href") === "/alpha/");
    expect(currentProjectLink).toBeTruthy();
    expect(currentProjectLink.getAttribute("aria-current")).toBe("page");
  });

  it("renders not found route for unknown paths", () => {
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={["/missing/"]}>
          <AppRoutes />
        </MemoryRouter>
      </HelmetProvider>,
    );

    expect(screen.getByText("Page not found")).toBeTruthy();
  });
});
