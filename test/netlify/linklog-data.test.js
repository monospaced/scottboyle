/**
 * @jest-environment node
 */

describe("linklog data loader", () => {
  it("writes a snapshot when the live fetch succeeds", async () => {
    const { createLinklogDataLoader } = await import(
      "../../netlify/lib/linklog-data.mjs"
    );
    const request = jest.fn().mockResolvedValue({
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
    const writeSnapshot = jest.fn().mockResolvedValue(undefined);

    const { loadLinklogData } = createLinklogDataLoader({
      now: () => "2025-01-02T00:00:00.000Z",
      readSnapshot: jest.fn(),
      request,
      writeSnapshot,
    });

    const result = await loadLinklogData();

    expect(result).toEqual({
      fetchedAt: "2025-01-02T00:00:00.000Z",
      links: [
        {
          d: "Live Link",
          dt: "2025-01-01T00:00:00Z",
          u: "https://example.com/live",
        },
      ],
      source: "live",
    });
    expect(writeSnapshot).toHaveBeenCalledWith({
      fetchedAt: "2025-01-02T00:00:00.000Z",
      links: [
        {
          d: "Live Link",
          dt: "2025-01-01T00:00:00Z",
          u: "https://example.com/live",
        },
      ],
    });
  });

  it("returns a snapshot when the live fetch fails", async () => {
    const warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
    const { createLinklogDataLoader } = await import(
      "../../netlify/lib/linklog-data.mjs"
    );
    const snapshot = {
      fetchedAt: "2025-01-02T00:00:00.000Z",
      links: [
        {
          d: "Cached Link",
          dt: "2025-01-01T00:00:00Z",
          u: "https://example.com/cached",
        },
      ],
    };

    const { loadLinklogData } = createLinklogDataLoader({
      readSnapshot: jest.fn().mockResolvedValue(snapshot),
      request: jest.fn().mockRejectedValue(new Error("feed down")),
      writeSnapshot: jest.fn(),
    });

    const result = await loadLinklogData();

    expect(result).toEqual({
      fetchedAt: "2025-01-02T00:00:00.000Z",
      links: snapshot.links,
      source: "snapshot",
    });
    expect(warnSpy).toHaveBeenCalledWith(
      "Serving Linklog snapshot after live fetch failure: feed down",
    );
    warnSpy.mockRestore();
  });

  it("throws when both live fetch and snapshot lookup fail", async () => {
    const { createLinklogDataLoader } = await import(
      "../../netlify/lib/linklog-data.mjs"
    );

    const { loadLinklogData } = createLinklogDataLoader({
      readSnapshot: jest.fn().mockResolvedValue(null),
      request: jest.fn().mockRejectedValue(new Error("feed down")),
      writeSnapshot: jest.fn(),
    });

    await expect(loadLinklogData()).rejects.toThrow("feed down");
  });
});
