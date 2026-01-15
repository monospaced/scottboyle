describe("fetchWithTimeout", () => {
  const realFetch = global.fetch;
  const realAbortController = global.AbortController;

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    global.fetch = realFetch;
    global.AbortController = realAbortController;
  });

  it("calls fetch with a User-Agent header and a signal", () => {
    const abortController = { signal: "signal", abort: jest.fn() };
    global.AbortController = jest.fn(() => abortController);
    global.fetch = jest.fn(() => Promise.resolve({}));
    const { fetchWithTimeout } = require("../fetch");

    fetchWithTimeout("https://example.com", 1234, "test-agent/1.0");

    expect(global.fetch).toHaveBeenCalledWith("https://example.com", {
      headers: { "User-Agent": "test-agent/1.0" },
      signal: "signal",
    });
  });

  it("aborts and clears timeout after the delay", async () => {
    const abortController = { signal: "signal", abort: jest.fn() };
    global.AbortController = jest.fn(() => abortController);
    global.fetch = jest.fn(() => new Promise(() => {}));
    const { fetchWithTimeout } = require("../fetch");

    fetchWithTimeout("https://example.com", 1000, "test-agent/1.0");

    jest.advanceTimersByTime(1000);

    expect(abortController.abort).toHaveBeenCalled();
  });
});
