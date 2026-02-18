import { ensureTrailingSlashPath, routePaths } from "../routes";

jest.mock("../data");

describe("Routes", () => {
  it("exports static site route paths", () => {
    expect(routePaths).toEqual([
      "/",
      "/alpha/",
      "/beta/",
      "/linklog/",
      "/404/",
    ]);
  });

  it("normalizes trailing slashes on urls", () => {
    expect(ensureTrailingSlashPath("/foo")).toBe("/foo/");
    expect(ensureTrailingSlashPath("/bar/")).toBe("/bar/");
    expect(ensureTrailingSlashPath("/")).toBe("/");
  });
});
