const { safeHref } = require("../href");

describe("safeHref", () => {
  it("returns http/https URLs", () => {
    expect(safeHref("http://example.com")).toBe("http://example.com/");
    expect(safeHref("https://example.com/path")).toBe(
      "https://example.com/path",
    );
  });

  it("rejects non-http protocols", () => {
    expect(safeHref("javascript:alert(1)")).toBeNull();
    expect(safeHref("data:text/html;base64,PGgxPkhlbGxvPC9oMT4=")).toBeNull();
  });

  it("returns null for invalid URLs", () => {
    expect(safeHref("not a url")).toBeNull();
  });
});
