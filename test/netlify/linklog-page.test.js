/**
 * @jest-environment node
 */

describe("linklog page handler", () => {
  it("server-renders snapshot links", async () => {
    const { createLinklogPageHandler } = await import(
      "../../netlify/lib/linklog-page-handler.mjs"
    );
    const handler = createLinklogPageHandler({
      loadLinklogData: jest.fn().mockResolvedValue({
        fetchedAt: "2025-01-02T00:00:00.000Z",
        links: [
          {
            d: "Cached Link",
            dt: "2025-01-01T00:00:00Z",
            n: "Description",
            u: "https://example.com/cached",
          },
        ],
        source: "snapshot",
      }),
      readTemplate: () =>
        "<html><body><div data-linklog-list>Loading…</div></body></html>",
    });

    const response = await handler();
    const body = await response.text();

    expect(response.status).toBe(200);
    expect(response.headers.get("Cache-Control")).toBe(
      "public, max-age=0, s-maxage=300",
    );
    expect(body).toContain('href="https://example.com/cached"');
    expect(body).toContain("Cached Link");
    expect(body).toContain("Description");
    expect(body).toContain('id="linklog-data"');
  });
});
