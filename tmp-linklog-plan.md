# Linklog Reliability Plan

## Goal

Keep `/linklog/` and `/api/linklog` serving useful link data even when the Pinboard feed is unavailable, while still preferring live Pinboard data whenever it can be fetched successfully.

## Current State

- `/.netlify/functions/linklog-page` SSRs `/linklog/`.
- `linklog-page` currently fetches `"/api/linklog"` over HTTP at request time.
- `/.netlify/functions/linklog` fetches the Pinboard JSON feed live.
- Successful responses are CDN-cached for `s-maxage=3600`.
- Failures are returned with `Cache-Control: no-store`.
- There is no durable application-level fallback once the CDN cache expires.

## Confirmed Problem

When Pinboard is unavailable and there is no still-valid CDN cache entry, the site falls through to:

- SSR page content: `"Unable to load linklog."`
- client retry: another fetch to `"/api/linklog"`
- result: likely still error

This makes `/linklog/` fragile for both users and crawlers.

## Agreed Direction

Use a shared, durable last-known-good snapshot in Netlify Blobs.

Important constraints:

- Live Pinboard remains the preferred source.
- No checked-in seed file is required.
- After deploy, the Blob can be populated manually the first time while Pinboard is healthy.
- Once populated, all users should receive the same fallback snapshot if Pinboard is down.

## Target Behavior

### On successful live fetch

1. Fetch Pinboard.
2. Validate and normalize the response.
3. Write the payload to Netlify Blobs as the last-known-good snapshot.
4. Return the live data.

### On live fetch failure

1. Attempt to read the last-known-good snapshot from Netlify Blobs.
2. If present and valid, return it.
3. If absent, return the current error state.

## Proposed Architecture

Create a shared server-side loader used by both Netlify functions:

- `fetchPinboardLinks()`
- `readLinklogSnapshot()`
- `writeLinklogSnapshot()`
- `loadLinklogData()`

`loadLinklogData()` should return a structured result like:

```js
{
  links,
  source, // "live" | "snapshot"
  fetchedAt,
  stale
}
```

## Implementation Plan

1. Add a server-side `linklog-store` module for Netlify Blobs access.
2. Add a shared `linklog-data` module that:
   - fetches the Pinboard feed
   - validates array shape
   - slices to `MAX_LINKS`
   - writes successful results to Blobs
   - falls back to Blobs on failure
3. Refactor `linklog.js` to use the shared loader instead of fetching Pinboard directly.
4. Refactor `linklog-page.js` to use the shared loader directly instead of making an HTTP call to `"/api/linklog"`.
5. Preserve SSR embedded data so hydration still uses server-rendered data as the source of truth.
6. Decide whether to expose metadata in API and/or page payload:
   - `source`
   - `fetchedAt`
   - possibly `stale`
7. Keep current user-facing output unchanged.

## Recommended Response Semantics

### `/api/linklog`

- Return `200` for live data.
- Return `200` for snapshot fallback data.
- Return error only if both live fetch and snapshot lookup fail.

### `/linklog/`

- Render links from live data when available.
- Render links from snapshot fallback when live fetch fails.
- Render `"Unable to load linklog."` only if neither source is available.

## Caching Notes

- CDN caching can remain in place for successful responses.
- Snapshot fallback should be considered application-level resilience, not a replacement for CDN caching.
- Live responses should keep the current longer cache window.
- Snapshot fallback responses should use a shorter cache window than live responses so the site checks back for live Pinboard recovery sooner.
- Suggested approach:
  - live data: current `s-maxage=3600`
  - snapshot fallback: shorter `s-maxage`, for example `300`

## Optional Follow-Up

- Add a manual refresh function or admin-only route to force-refresh the Blob.
- Add a subtle stale indicator in the UI, for example “Last updated YYYY-MM-DD”.
- Add observability logs for:
  - live fetch success
  - snapshot fallback served
  - total failure

## Testing Plan

1. Unit test live success writes snapshot.
2. Unit test live failure + snapshot present returns snapshot.
3. Unit test live failure + no snapshot returns error.
4. Unit test `linklog-page` SSRs snapshot links.
5. Unit test client hydration still skips refetch when SSR embedded data exists.

## Rollout Plan

1. Implement Blobs-backed fallback.
2. Deploy.
3. Manually hit `/linklog/` while Pinboard is healthy to populate the Blob.
4. Verify subsequent fallback behavior by simulating Pinboard failure locally or by temporarily overriding the feed URL.

## Decisions

- Do not show stale snapshot metadata in the UI.
- Do not add a dedicated refresh endpoint now.
- Rely on normal requests to `/linklog/` to refresh the snapshot when live Pinboard is available.
- Use a shorter CDN cache window for snapshot-served responses than for live responses, so the system returns to live data sooner after Pinboard recovers.
