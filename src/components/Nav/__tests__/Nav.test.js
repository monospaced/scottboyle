import React from "react";
import { render, screen } from "@testing-library/react";

import data from "../../../scripts/__mocks__/data.js";
import Nav from "../Nav.js";

jest.mock("react-router", () => ({
  Link: ({ children, to, ...props }) =>
    require("react").createElement("a", { href: to, ...props }, children),
}));

describe("Nav component", () => {
  const { projects } = data;

  it("renders navigation headings and project links", () => {
    render(<Nav projects={projects} routes={[{ path: "" }]} />);

    expect(screen.getByRole("heading", { name: "Blog" })).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Work" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "Linklog" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "Project Alpha" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "Project Beta" })).toBeTruthy();
  });

  it("marks the active project link", () => {
    render(
      <Nav
        projects={projects}
        routes={[{ path: Object.keys(projects)[0] }]}
      />,
    );

    expect(screen.getByRole("link", { name: "Project Alpha" }).getAttribute("aria-current")).toBe(
      "page",
    );
  });

  it("marks linklog as active when on linklog route", () => {
    render(<Nav projects={projects} routes={[{ path: "linklog" }]} />);

    expect(screen.getByRole("link", { name: "Linklog" }).getAttribute("aria-current")).toBe(
      "page",
    );
  });
});
