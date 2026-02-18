import React from "react";
import { render, screen } from "@testing-library/react";

import Client from "../Client.js";

describe("Client component", () => {
  it("renders nothing when title is missing", () => {
    const { container } = render(<Client client={{}} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders client title", () => {
    render(<Client client={{ title: "Client" }} />);
    expect(screen.getByText("Client")).toBeTruthy();
  });

  it("renders client link when link is provided", () => {
    render(<Client client={{ title: "Client", link: "https://client.com" }} />);

    expect(screen.getByRole("link", { name: "Client" }).getAttribute("href")).toBe(
      "https://client.com",
    );
  });
});
