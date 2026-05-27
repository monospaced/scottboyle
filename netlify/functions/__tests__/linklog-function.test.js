jest.mock("../linklog-data", () => ({
  loadLinklogData: jest.fn(),
}));

describe("linklog function", () => {
  const { loadLinklogData } = require("../linklog-data");

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("uses the live cache window for live data", async () => {
    loadLinklogData.mockResolvedValue({
      links: [{ d: "Live Link" }],
      source: "live",
    });

    const { handler } = require("../linklog");
    const response = await handler({ headers: {} });

    expect(response.statusCode).toBe(200);
    expect(response.headers["Cache-Control"]).toBe(
      "public, max-age=0, s-maxage=3600",
    );
    expect(response.body).toBe(JSON.stringify([{ d: "Live Link" }]));
  });

  it("uses the shorter cache window for snapshot data", async () => {
    loadLinklogData.mockResolvedValue({
      links: [{ d: "Cached Link" }],
      source: "snapshot",
    });

    const { handler } = require("../linklog");
    const response = await handler({ headers: {} });

    expect(response.statusCode).toBe(200);
    expect(response.headers["Cache-Control"]).toBe(
      "public, max-age=0, s-maxage=300",
    );
    expect(response.body).toBe(JSON.stringify([{ d: "Cached Link" }]));
  });
});
