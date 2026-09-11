import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import Video from "../Video.js";

describe("Video component", () => {
  const project = {
    title: "Video Project",
    link: "https://example.com/video",
    image: { width: 398, height: 280 },
  };

  it("renders a video labelled by the project title", () => {
    render(<Video project={project} slug="alpha" />);

    expect(screen.getByLabelText("Video Project")).toBeTruthy();
  });

  it("wraps the video in a link when one is provided", () => {
    const { container } = render(<Video project={project} slug="alpha" />);

    const link = container.querySelector(".VideoLink");
    expect(link).toBeTruthy();
    expect(link.getAttribute("href")).toBe("https://example.com/video");
  });

  it("does not wrap in a link when no link is provided", () => {
    const { container } = render(
      <Video project={{ ...project, link: "" }} slug="alpha" />,
    );

    expect(container.querySelector(".VideoLink")).toBeNull();
  });

  it("applies loaded class after the first frame loads", () => {
    const { container } = render(<Video project={project} slug="alpha" />);

    fireEvent.loadedData(screen.getByLabelText("Video Project"));

    expect(container.querySelector(".Video.is-loaded")).toBeTruthy();
  });

  it("applies loaded class on mount when the video already has data", () => {
    // Simulates a full page load where `loadeddata` fired before hydration.
    const readyState = jest
      .spyOn(window.HTMLMediaElement.prototype, "readyState", "get")
      .mockReturnValue(2);

    const { container } = render(<Video project={project} slug="alpha" />);

    expect(container.querySelector(".Video.is-loaded")).toBeTruthy();
    readyState.mockRestore();
  });

  it("plays automatically when reduced motion is not preferred", () => {
    const play = jest
      .spyOn(window.HTMLMediaElement.prototype, "play")
      .mockImplementation(() => Promise.resolve());

    render(<Video project={project} slug="alpha" />);

    expect(play).toHaveBeenCalled();
    play.mockRestore();
  });

  it("does not play when reduced motion is preferred", () => {
    const matchMedia = jest
      .spyOn(window, "matchMedia")
      .mockImplementation((query) => ({
        matches: true,
        media: query,
        addEventListener: () => {},
        removeEventListener: () => {},
      }));
    const play = jest
      .spyOn(window.HTMLMediaElement.prototype, "play")
      .mockImplementation(() => Promise.resolve());
    const pause = jest
      .spyOn(window.HTMLMediaElement.prototype, "pause")
      .mockImplementation(() => {});

    render(<Video project={project} slug="alpha" />);

    expect(play).not.toHaveBeenCalled();
    expect(pause).toHaveBeenCalled();

    matchMedia.mockRestore();
    play.mockRestore();
    pause.mockRestore();
  });
});
