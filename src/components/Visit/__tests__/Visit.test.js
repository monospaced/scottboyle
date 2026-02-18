import React from "react";
import { render, screen } from "@testing-library/react";

import Visit from "../Visit.js";

describe("Visit component", () => {
  it("renders nothing when link data is missing", () => {
    const { container } = render(<Visit project={{}} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders a project link", () => {
    render(<Visit project={{ link: "https://site.com", title: "Site" }} />);
    expect(screen.getByRole("link", { name: "Site" }).getAttribute("href")).toBe(
      "https://site.com",
    );
  });
});
