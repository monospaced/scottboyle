import React from "react";
import { render, screen } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";

import data from "../../../scripts/__mocks__/data.js";
import Project from "../Project.js";

describe("Project component", () => {
  const { description, projects, subtitle, title, url } = data;

  it("renders each project with expected content", () => {
    const props = {
      data: { description, projects, subtitle, title, url },
      path: "",
    };

    Object.keys(projects).forEach((key) => {
      props.path = key;
      const { client, content, link, title: projectTitle } = projects[key];

      const { unmount } = render(
        <HelmetProvider>
          <Project {...props} />
        </HelmetProvider>,
      );

      expect(
        screen.getByRole("heading", { level: 2, name: new RegExp(projectTitle) }),
      ).toBeTruthy();
      expect(screen.getByText(content.trim())).toBeTruthy();

      if (client && client.title) {
        expect(screen.getByText(client.title)).toBeTruthy();
      }

      if (link && projectTitle) {
        const projectLinks = screen.getAllByRole("link", {
          name: projectTitle,
        });
        expect(
          projectLinks.some(
            (projectLink) => projectLink.getAttribute("href") === link,
          ),
        ).toBe(true);
      }

      unmount();
    });
  });
});
