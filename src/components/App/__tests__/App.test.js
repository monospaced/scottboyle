import React from "react";
import { render, screen } from "@testing-library/react";

import App from "../App.js";

jest.mock("../../Header/Header", () => ({ subtitle, title }) => (
  <div data-testid="header">{`${title}|${subtitle}`}</div>
));

jest.mock("../../Nav/Nav", () => ({ projects, routes }) => (
  <div data-testid="nav">{`${Object.keys(projects).length}|${routes.length}`}</div>
));

describe("App component", () => {
  it("renders header, child route content, and nav", () => {
    const props = {
      route: { data: { subtitle: "Subtitle", title: "Title", projects: { alpha: {} } } },
      routes: [{ path: "" }],
    };

    const Child = ({ data }) => <main data-testid="child">{data.title}</main>;

    render(
      <App {...props}>
        <Child />
      </App>,
    );

    expect(screen.getByTestId("header").textContent).toBe("Title|Subtitle");
    expect(screen.getByTestId("child").textContent).toBe("Title");
    expect(screen.getByTestId("nav").textContent).toBe("1|1");
  });
});
