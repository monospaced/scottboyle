/**
 * @jest-environment node
 */

describe("linklog data loader", () => {
  const createDeferred = () => {
    let resolve;
    const promise = new Promise(res => {
      resolve = res;
    });

    return { promise, resolve };
  };

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

  it("waits for the snapshot write to finish before resolving live data", async () => {
    const { createLinklogDataLoader } = await import(
      "../../netlify/lib/linklog-data.mjs"
    );
    const deferred = createDeferred();
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
    const writeSnapshot = jest.fn().mockImplementation(() => deferred.promise);

    const { loadLinklogData } = createLinklogDataLoader({
      now: () => "2025-01-02T00:00:00.000Z",
      readSnapshot: jest.fn(),
      request,
      writeSnapshot,
    });

    let resolved = false;
    const resultPromise = loadLinklogData().then(result => {
      resolved = true;
      return result;
    });

    await Promise.resolve();
    await Promise.resolve();

    expect(resolved).toBe(false);

    deferred.resolve();

    await expect(resultPromise).resolves.toEqual({
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
