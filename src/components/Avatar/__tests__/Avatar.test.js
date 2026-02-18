import React from "react";
import { render, screen } from "@testing-library/react";

import Avatar from "../Avatar.js";

describe("Avatar component", () => {
  it("renders the page title and avatar image", () => {
    render(<Avatar />);

    expect(screen.getByRole("heading", { level: 2 })).toBeTruthy();
    expect(screen.getByRole("img", { name: "About" })).toBeTruthy();
  });
});
