import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import data from "../../../scripts/__mocks__/data.js";
import Nav from "../Nav.js";

describe("Nav component", () => {
  const { projects } = data;

  it("renders navigation headings and project links", () => {
    render(
      <MemoryRouter
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      >
        <Nav currentPath="" projects={projects} />
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { name: "Blog" })).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Work" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "Linklog" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "Project Alpha" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "Project Beta" })).toBeTruthy();
  });

  it("marks the active project link", () => {
    render(
      <MemoryRouter
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      >
        <Nav currentPath={Object.keys(projects)[0]} projects={projects} />
      </MemoryRouter>,
    );

    expect(
      screen
        .getByRole("link", { name: "Project Alpha" })
        .getAttribute("aria-current"),
    ).toBe("page");
  });

  it("marks linklog as active when on linklog route", () => {
    render(
      <MemoryRouter
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      >
        <Nav currentPath="linklog" projects={projects} />
      </MemoryRouter>,
    );

    expect(
      screen
        .getByRole("link", { name: "Linklog" })
        .getAttribute("aria-current"),
    ).toBe("page");
  });
});
