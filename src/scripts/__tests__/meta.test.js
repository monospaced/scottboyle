const { buildSocialMeta } = require("../meta");

describe("buildSocialMeta", () => {
  it("builds canonical links and social meta tags", () => {
    const result = buildSocialMeta({
      description: "Example description.",
      image: "https://example.com/social.png",
      siteName: "Example Site",
      title: "Example Title",
      type: "article",
      url: "https://example.com/example/",
    });

    expect(result.canonical).toBe("https://example.com/example/");
    expect(result.meta).toEqual({
      name: {
        "twitter:card": "summary_large_image",
        "twitter:description": "Example description.",
        "twitter:image": "https://example.com/social.png",
        "twitter:title": "Example Title",
      },
      property: {
        "og:description": "Example description.",
        "og:image": "https://example.com/social.png",
        "og:site_name": "Example Site",
        "og:title": "Example Title",
        "og:type": "article",
        "og:url": "https://example.com/example/",
      },
    });
  });
});
