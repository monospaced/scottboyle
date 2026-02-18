import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import data from "../../../scripts/__mocks__/data.js";
import Screenshot from "../Screenshot.js";

describe("Screenshot component", () => {
  const { projects } = data;

  it("renders screenshot image for each project", () => {
    Object.keys(projects).forEach((key) => {
      const { title } = projects[key];
      const { unmount } = render(
        <Screenshot project={projects[key]} slug={key} />,
      );

      expect(screen.getByRole("img", { name: title })).toBeTruthy();
      unmount();
    });
  });

  it("applies loaded class after image load", () => {
    Object.keys(projects).forEach((key) => {
      const { title } = projects[key];
      const { container, unmount } = render(
        <Screenshot project={projects[key]} slug={key} />,
      );
      fireEvent.load(screen.getByRole("img", { name: title }));

      expect(container.querySelector(".Screenshot.is-loaded")).toBeTruthy();
      unmount();
    });
  });

  it("does not reset loaded state when rerendered with the same slug", () => {
    const key = Object.keys(projects)[0];
    const { container, rerender } = render(
      <Screenshot project={projects[key]} slug={key} />,
    );

    fireEvent.load(screen.getByRole("img", { name: projects[key].title }));
    rerender(<Screenshot project={projects[key]} slug={key} />);

    expect(container.querySelector(".Screenshot.is-loaded")).toBeTruthy();
  });
});
