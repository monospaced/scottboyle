const path = require("path");
const fs = require("fs");

const { buildSitemap, normalizePath } = require("../sitemap");

describe("sitemap generator", () => {
  it("writes a sitemap for public routes", () => {
    const mkdirSync = jest.spyOn(fs, "mkdirSync").mockImplementation(() => {});
    const writeFileSync = jest
      .spyOn(fs, "writeFileSync")
      .mockImplementation(() => {});
    const siteUrl = "https://example.com/";
    process.env.SITE_URL = siteUrl;

    const result = buildSitemap(["/", "linklog", "/projects/", "404", "*"]);

    expect(result.urls).toEqual([
      "https://example.com/",
      "https://example.com/linklog/",
      "https://example.com/projects/",
    ]);
    expect(mkdirSync).toHaveBeenCalledWith(path.dirname(result.outputPath), {
      recursive: true,
    });
    expect(writeFileSync).toHaveBeenCalledWith(
      result.outputPath,
      result.xml,
      "utf8",
    );
    expect(result.xml).toContain("<loc>https://example.com/linklog/</loc>");

    delete process.env.SITE_URL;
    mkdirSync.mockRestore();
    writeFileSync.mockRestore();
  });

  it("normalizes trailing slashes and removes duplicates", () => {
    const mkdirSync = jest.spyOn(fs, "mkdirSync").mockImplementation(() => {});
    const writeFileSync = jest
      .spyOn(fs, "writeFileSync")
      .mockImplementation(() => {});
    process.env.SITE_URL = "https://example.com";

    const result = buildSitemap(["/", "/linklog", "/linklog/", "/linklog"]);

    expect(result.urls).toEqual([
      "https://example.com/",
      "https://example.com/linklog/",
    ]);

    delete process.env.SITE_URL;
    mkdirSync.mockRestore();
    writeFileSync.mockRestore();
  });

  it("normalizes empty routes to the site root", () => {
    expect(normalizePath()).toBe("/");
  });

  it("uses routerToArray when routes are not an array", () => {
    jest.resetModules();
    const routerToArray = jest.fn().mockReturnValue(["/linklog"]);
    jest.doMock("react-router-to-array", () => routerToArray);
    const mkdirSync = jest.spyOn(fs, "mkdirSync").mockImplementation(() => {});
    const writeFileSync = jest
      .spyOn(fs, "writeFileSync")
      .mockImplementation(() => {});

    const { buildSitemap: buildSitemapWithMock } = require("../sitemap");
    const result = buildSitemapWithMock({});

    expect(routerToArray).toHaveBeenCalledWith({});
    expect(result.urls).toEqual(["https://scottboyle.uk/linklog/"]);
    expect(mkdirSync).toHaveBeenCalledWith(path.dirname(result.outputPath), {
      recursive: true,
    });
    expect(writeFileSync).toHaveBeenCalledWith(
      result.outputPath,
      result.xml,
      "utf8",
    );

    mkdirSync.mockRestore();
    writeFileSync.mockRestore();
    jest.dontMock("react-router-to-array");
    jest.resetModules();
  });

  it("handles a call with no options", () => {
    jest.resetModules();
    jest.doMock("fs", () => ({
      mkdirSync: jest.fn(),
      writeFileSync: jest.fn(),
    }));

    try {
      const { buildSitemap: buildSitemapWithDefaults } = require("../sitemap");
      const result = buildSitemapWithDefaults();

      expect(result.urls).toEqual([]);
      expect(result.xml).toContain(
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      );
    } finally {
      jest.dontMock("fs");
      jest.resetModules();
    }
  });
});
