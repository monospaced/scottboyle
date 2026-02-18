import React from "react";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import Linklog from "../Linklog.js";
import feed from "../__mocks__/feed.mock.json";
import data from "../../../scripts/__mocks__/data.js";

describe("Linklog component", () => {
  const { description, linklogErrorMessage, subtitle, title, url } = data;
  const props = { data: { description, linklogErrorMessage, subtitle, title, url } };
  const flushPromises = () => new Promise(resolve => setTimeout(resolve, 0));

  const appendEmbeddedData = payload => {
    const script = document.createElement("script");
    script.id = "linklog-data";
    script.type = "application/json";
    script.textContent = JSON.stringify(payload);
    document.body.appendChild(script);
  };

  let fetchMock;

  beforeAll(() => {
    window.scrollTo = jest.fn();
  });

  beforeEach(() => {
    fetchMock = jest.fn().mockResolvedValue({
      json: () => Promise.resolve(feed),
      ok: true,
    });
    global.fetch = fetchMock;
  });

  afterEach(() => {
    delete global.fetch;
    const embedded = document.getElementById("linklog-data");
    if (embedded) {
      embedded.remove();
    }
  });

  it("renders loading state while awaiting fetch", () => {
    fetchMock.mockReturnValueOnce(new Promise(() => {}));
    render(<Linklog {...props} />);

    expect(screen.getByText("Loading…")).toBeTruthy();
  });

  it("fetches and renders linklog entries", async () => {
    render(<Linklog {...props} />);

    await act(async () => {
      await flushPromises();
    });

    expect(fetchMock).toHaveBeenCalledWith("/api/linklog");
    expect(screen.getByRole("link", { name: "Mock Link A" }).getAttribute("href")).toBe(
      "https://example.com/mock-a",
    );
    expect(screen.getByRole("link", { name: "Mock Link B" })).toBeTruthy();
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });

  it("skips items with unsafe hrefs", () => {
    appendEmbeddedData([
      { d: "Relative link", dt: "2018-04-05T21:20:55Z", u: "/relative" },
      { d: "Bad link", dt: "2018-04-06T21:20:55Z", u: "javascript:alert(1)" },
      { d: "Good link", dt: "2018-04-07T21:20:55Z", u: "https://example.com" },
    ]);
    render(<Linklog {...props} />);

    expect(screen.queryByRole("link", { name: "Relative link" })).toBeNull();
    expect(screen.queryByRole("link", { name: "Bad link" })).toBeNull();
    expect(screen.getByRole("link", { name: "Good link" }).getAttribute("href")).toBe(
      "https://example.com/",
    );
    expect(screen.getAllByRole("listitem")).toHaveLength(1);
  });

  it("renders error state for non-array responses", async () => {
    fetchMock.mockResolvedValueOnce({
      json: () => Promise.resolve({ items: feed }),
      ok: true,
    });
    render(<Linklog {...props} />);

    await act(async () => {
      await flushPromises();
    });
    expect(screen.getByText(linklogErrorMessage)).toBeTruthy();
  });

  it("renders error state for empty responses", async () => {
    fetchMock.mockResolvedValueOnce({
      json: () => Promise.resolve([]),
      ok: true,
    });
    render(<Linklog {...props} />);

    await act(async () => {
      await flushPromises();
    });
    expect(screen.getByText(linklogErrorMessage)).toBeTruthy();
  });

  it("renders error state for failed fetches", async () => {
    fetchMock.mockRejectedValueOnce(new Error("fail"));
    render(<Linklog {...props} />);

    await act(async () => {
      await flushPromises();
    });
    expect(screen.getByText(linklogErrorMessage)).toBeTruthy();
  });

  it("renders error state when response is not ok", async () => {
    fetchMock.mockResolvedValueOnce({
      json: jest.fn(),
      ok: false,
    });
    render(<Linklog {...props} />);

    await act(async () => {
      await flushPromises();
    });
    expect(screen.getByText(linklogErrorMessage)).toBeTruthy();
  });

  it("renders error state when fetch is unavailable", async () => {
    delete global.fetch;
    render(<Linklog {...props} />);

    await act(async () => {
      await flushPromises();
    });
    expect(screen.getByText(linklogErrorMessage)).toBeTruthy();
  });

  it("hydrates from embedded link data and skips fetching", () => {
    appendEmbeddedData(feed);
    render(<Linklog {...props} />);

    expect(screen.getByRole("link", { name: "Mock Link A" })).toBeTruthy();
    expect(fetchMock).not.toHaveBeenCalled();
    expect(document.getElementById("linklog-data")).toBeNull();
  });

  it("shows error when embedded error payload is present and fetch is unavailable", async () => {
    appendEmbeddedData({ error: true });
    delete global.fetch;
    render(<Linklog {...props} />);

    await act(async () => {
      await flushPromises();
    });
    expect(screen.getByText(linklogErrorMessage)).toBeTruthy();
    expect(document.getElementById("linklog-data")).toBeNull();
  });

  it("ignores invalid embedded JSON and falls back to loading", () => {
    fetchMock.mockReturnValueOnce(new Promise(() => {}));
    const script = document.createElement("script");
    script.id = "linklog-data";
    script.type = "application/json";
    script.textContent = "{not-json";
    document.body.appendChild(script);

    render(<Linklog {...props} />);

    expect(screen.getByText("Loading…")).toBeTruthy();
    expect(document.getElementById("linklog-data")).toBeNull();
  });
});
