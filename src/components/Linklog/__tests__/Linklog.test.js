import { shallow } from "enzyme";
import React from "react";

import Linklog from "../Linklog.js";
import feed from "../__mocks__/feed.mock.json";
import data from "../../../scripts/__mocks__/data.js";

describe("Linklog component", () => {
  const { description, subtitle, title, url } = data;
  const props = { data: { description, subtitle, title, url } };
  const flushPromises = () => new Promise(resolve => setImmediate(resolve));

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
  });

  it("should render correctly", () => {
    const component = shallow(<Linklog {...props} />, {
      disableLifecycleMethods: true,
    });
    component.setState({ links: [], status: "loading" });

    expect(component).toMatchSnapshot();
  });

  it("should render feed data correctly", () => {
    const component = shallow(<Linklog {...props} />, {
      disableLifecycleMethods: true,
    });
    component.setState({ links: feed, status: "loaded" });

    expect(component).toMatchSnapshot();
  });

  it("should skip items with unsafe hrefs", () => {
    const component = shallow(<Linklog {...props} />, {
      disableLifecycleMethods: true,
    });
    component.setState({
      links: [
        {
          d: "Relative link",
          dt: "2018-04-05T21:20:55Z",
          u: "/relative",
        },
        {
          d: "Bad link",
          dt: "2018-04-06T21:20:55Z",
          u: "javascript:alert(1)",
        },
        {
          d: "Good link",
          dt: "2018-04-07T21:20:55Z",
          u: "https://example.com",
        },
      ],
    });

    expect(component.find("li")).toHaveLength(1);
    expect(
      component
        .find("li")
        .find("a")
        .prop("href"),
    ).toBe("https://example.com/");
  });

  it("should render no list when links is falsy", () => {
    const component = shallow(<Linklog {...props} />, {
      disableLifecycleMethods: true,
    });
    component.setState({ links: null, status: "loaded" });

    expect(component.find("ul")).toHaveLength(0);
  });

  it("should fetch and set links on mount", async () => {
    const component = shallow(<Linklog {...props} />);
    await flushPromises();

    expect(fetchMock).toHaveBeenCalledWith("/api/linklog");
    expect(component.state("links")).toEqual(feed);
    expect(component.state("status")).toEqual("loaded");
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });

  it("should ignore non-array responses", async () => {
    fetchMock.mockResolvedValueOnce({
      json: () => Promise.resolve({ items: feed }),
      ok: true,
    });
    const component = shallow(<Linklog {...props} />);
    await flushPromises();

    expect(component.state("links")).toEqual([]);
    expect(component.state("status")).toEqual("error");
  });

  it("should keep links empty on fetch failure", async () => {
    fetchMock.mockRejectedValueOnce(new Error("fail"));
    const component = shallow(<Linklog {...props} />);
    await flushPromises();

    expect(component.state("links")).toEqual([]);
    expect(component.state("status")).toEqual("error");
  });

  it("should keep links empty when response is not ok", async () => {
    fetchMock.mockResolvedValueOnce({
      json: jest.fn(),
      ok: false,
    });
    const component = shallow(<Linklog {...props} />);
    await flushPromises();

    expect(component.state("links")).toEqual([]);
    expect(component.state("status")).toEqual("error");
  });

  it("should no-op when fetch is unavailable", () => {
    delete global.fetch;
    const component = shallow(<Linklog {...props} />);

    expect(component.state("links")).toEqual([]);
    expect(component.state("status")).toEqual("error");
  });
});
