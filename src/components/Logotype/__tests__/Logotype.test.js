import React from "react";
import { render, screen } from "@testing-library/react";

import Logotype from "../Logotype.js";

jest.mock("react-router", () => ({
  IndexLink: ({ children, to, ...props }) =>
    require("react").createElement("a", { href: to, ...props }, children),
}));

describe("Logotype component", () => {
  it("renders a homepage link with title and subtitle", () => {
    render(<Logotype subtitle="Subtitle" title="Title" />);

    expect(screen.getByRole("heading", { level: 1 })).toBeTruthy();
    expect(screen.getByRole("link", { name: /title subtitle/i }).getAttribute("href")).toBe("/");
  });
});
