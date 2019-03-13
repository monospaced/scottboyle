import React from "react";
import { shallow } from "enzyme";

import data from "../../../scripts/__mocks__/data.js";
import feed from "../__mocks__/feed.mock.json";
import Linklog from "../Linklog.js";

describe("Linklog component", () => {
  const { description, subtitle, title } = data;
  const props = { data: { description, subtitle, title } };

  beforeAll((window.scrollTo = () => {}));

  it("should render correctly", () => {
    const component = shallow(<Linklog {...props} />);
    component.setState({ links: false });
    expect(component).toMatchSnapshot();
  });

  it("should render feed data correctly", () => {
    const component = shallow(<Linklog {...props} />);
    component.setState({ links: feed });
    expect(component).toMatchSnapshot();
  });

  it("should call fetch when mounted", () => {
    const spy = jest.spyOn(Linklog.prototype, "fetchLinks");
    const component = shallow(<Linklog {...props} />);
    expect(spy).toHaveBeenCalled();
  });

  it("should set state correctly when fetch succeeds", () => {
    const component = shallow(<Linklog {...props} />);
    component.setState({ links: false });
    component
      .instance()
      .fetchLinks("url")
      .then(() => {
        expect(component.state("links")).toEqual(feed);
      });
  });
});
