jest.mock("../../../src/scripts/fetch", () => ({
  fetchWithTimeout: jest.fn(),
}));

jest.mock("@netlify/blobs", () => ({
  connectLambda: jest.fn(),
  getStore: jest.fn(),
}));

describe("loadLinklogData", () => {
  const { fetchWithTimeout } = require("../../../src/scripts/fetch");
  const { connectLambda, getStore } = require("@netlify/blobs");

  let setJSON;
  let get;

  beforeEach(() => {
    jest.clearAllMocks();

    setJSON = jest.fn(() => Promise.resolve());
    get = jest.fn(() => Promise.resolve(null));
    getStore.mockReturnValue({ get, setJSON });
  });

  it("returns live links and writes a snapshot on success", async () => {
    fetchWithTimeout.mockResolvedValue({
      json: () =>
        Promise.resolve(
          Array.from({ length: 25 }, (_, index) => ({
            d: `Link ${index + 1}`,
            dt: `2025-01-${String(index + 1).padStart(2, "0")}T00:00:00Z`,
            u: `https://example.com/${index + 1}`,
          })),
        ),
      ok: true,
    });

    const { loadLinklogData } = require("../linklog-data");
    const result = await loadLinklogData({ blobs: "mock-blobs-context" });

    expect(result.source).toBe("live");
    expect(result.links).toHaveLength(20);
    expect(connectLambda).toHaveBeenCalledWith({ blobs: "mock-blobs-context" });
    expect(setJSON).toHaveBeenCalledWith(
      "latest",
      expect.objectContaining({
        fetchedAt: expect.any(String),
        links: expect.arrayContaining([
          expect.objectContaining({ d: "Link 1" }),
        ]),
      }),
    );
  });

  it("still returns live links when snapshot persistence fails", async () => {
    fetchWithTimeout.mockResolvedValue({
      json: () =>
        Promise.resolve([
          {
            d: "Live Link",
            dt: "2025-01-01T00:00:00Z",
            u: "https://example.com/live",
          },
        ]),
      ok: true,
    });
    setJSON.mockRejectedValue(new Error("write failed"));

    const { loadLinklogData } = require("../linklog-data");
    const result = await loadLinklogData({ blobs: "mock-blobs-context" });

    expect(result).toEqual(
      expect.objectContaining({
        links: [
          {
            d: "Live Link",
            dt: "2025-01-01T00:00:00Z",
            u: "https://example.com/live",
          },
        ],
        source: "live",
      }),
    );
  });

  it("returns the snapshot when the live fetch fails", async () => {
    fetchWithTimeout.mockRejectedValue(new Error("feed down"));
    get.mockResolvedValue({
      fetchedAt: "2025-01-02T00:00:00.000Z",
      links: [
        {
          d: "Cached Link",
          dt: "2025-01-01T00:00:00Z",
          u: "https://example.com/cached",
        },
      ],
    });

    const { loadLinklogData } = require("../linklog-data");
    const result = await loadLinklogData({ blobs: "mock-blobs-context" });

    expect(result).toEqual({
      fetchedAt: "2025-01-02T00:00:00.000Z",
      links: [
        {
          d: "Cached Link",
          dt: "2025-01-01T00:00:00Z",
          u: "https://example.com/cached",
        },
      ],
      source: "snapshot",
    });
  });

  it("throws when live fetch fails and no snapshot exists", async () => {
    fetchWithTimeout.mockRejectedValue(new Error("feed down"));
    get.mockResolvedValue(null);

    const { loadLinklogData } = require("../linklog-data");

    await expect(
      loadLinklogData({ blobs: "mock-blobs-context" }),
    ).rejects.toThrow("feed down");
  });
});
