import React from "react";
import { shallow } from "enzyme";

import data from "../../../scripts/__mocks__/data.js";
import feed from "../__mocks__/feed.mock.json";
import Linklog from "../Linklog.js";

describe("Linklog component", () => {
  const { description, subtitle, title } = data;
  const props = { data: { description, subtitle, title } };
  let fetchMock;

  const flushPromises = () => new Promise(resolve => setImmediate(resolve));

  beforeAll(() => {
    window.scrollTo = jest.fn();
  });
  beforeEach(() => {
    fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(feed),
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
    component.setState({ links: [] });
    expect(component).toMatchSnapshot();
  });

  it("should render feed data correctly", () => {
    const component = shallow(<Linklog {...props} />, {
      disableLifecycleMethods: true,
    });
    component.setState({ links: feed });
    expect(component).toMatchSnapshot();
  });

  it("should skip items with unsafe hrefs", () => {
    const component = shallow(<Linklog {...props} />, {
      disableLifecycleMethods: true,
    });
    component.setState({
      links: [
        {
          u: "javascript:alert(1)",
          d: "Bad link",
          dt: "2018-04-06T21:20:55Z",
        },
        {
          u: "https://example.com",
          d: "Good link",
          dt: "2018-04-07T21:20:55Z",
        },
      ],
    });
    expect(component.find("li")).toHaveLength(1);
    expect(component.find("a").prop("href")).toBe("https://example.com/");
  });

  it("should render no list when links is falsy", () => {
    const component = shallow(<Linklog {...props} />, {
      disableLifecycleMethods: true,
    });
    component.setState({ links: null });
    expect(component.find("ul")).toHaveLength(0);
  });

  it("should fetch and set links on mount", async () => {
    const component = shallow(<Linklog {...props} />);
    await flushPromises();

    expect(fetchMock).toHaveBeenCalledWith("/api/linklog");
    expect(component.state("links")).toEqual(feed);
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });

  it("should ignore non-array responses", async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ items: feed }),
    });

    const component = shallow(<Linklog {...props} />);
    await flushPromises();

    expect(component.state("links")).toEqual([]);
  });

  it("should keep links empty on fetch failure", async () => {
    fetchMock.mockRejectedValueOnce(new Error("fail"));

    const component = shallow(<Linklog {...props} />);
    await flushPromises();

    expect(component.state("links")).toEqual([]);
  });

  it("should keep links empty when response is not ok", async () => {
    fetchMock.mockResolvedValueOnce({
      ok: false,
      json: jest.fn(),
    });

    const component = shallow(<Linklog {...props} />);
    await flushPromises();

    expect(component.state("links")).toEqual([]);
  });

  it("should no-op when fetch is unavailable", () => {
    delete global.fetch;
    const component = shallow(<Linklog {...props} />);

    expect(component.state("links")).toEqual([]);
  });
});
