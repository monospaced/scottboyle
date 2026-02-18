import React from "react";
import { render, screen } from "@testing-library/react";

import Header from "../Header.js";

describe("Header component", () => {
  it("renders a banner landmark", () => {
    render(<Header />);

    expect(screen.getByRole("banner")).toBeTruthy();
  });
});
