# Site Configuration (`site.json`)

`apps/site/site.json` is a manually maintained JSON file that controls global site metadata, RSS feeds, and time-sensitive UI elements (banners and badges).

It is imported via `apps/site/next.json.mjs` and exposed as a read-only API endpoint at `/api/site.json`.

This endpoint is also consumed externally by the [doc-kit](https://github.com/nodejs/doc-kit) to display dynamic banners inside the API docs, for example security announcements or EOL notices, without requiring a doc-kit release.

## Structure

### Top-level metadata

| Field         | Description                                 |
| ------------- | ------------------------------------------- |
| `title`       | Site title used in `<title>` and OG tags    |
| `description` | Default meta description                    |
| `favicon`     | Path to the favicon (relative to `/public`) |
| `accentColor` | Primary accent color (hex)                  |

### `twitter`

Social card metadata for Twitter/X.

| Field      | Description                                        |
| ---------- | -------------------------------------------------- |
| `username` | Twitter handle (e.g. `@nodejs`)                    |
| `card`     | Card type (`summary`, `summary_large_image`, etc.) |
| `img`      | Path to the card image                             |
| `imgAlt`   | Alt text for the card image                        |

### `rssFeeds`

Array of RSS feed definitions. Each feed is statically generated at `/:locale/feed/:file`.

| Field      | Description                                                     |
| ---------- | --------------------------------------------------------------- |
| `title`    | Human-readable feed title                                       |
| `file`     | Output filename (e.g. `blog.xml`)                               |
| `category` | Blog category to include (`all`, `release`, `vulnerability`, …) |

Adding a new feed here automatically makes it available; no code changes needed.

### `websiteBanners`

A map of keys to banner definitions. Banners appear at the top of the target surface within the given date range.

Keys are either a **page slug** (for nodejs.org pages) or a **major version string** (for API doc pages). The doc-kit fetches this endpoint and matches banners by version key (e.g. `"v24"`) or a special `"all"` key that applies to every API docs version.

```json
"websiteBanners": {
  "index": {
    "startDate": "2026-01-13T00:00:00.000Z",
    "endDate":   "2026-01-20T00:00:00.000Z",
    "text": "January Security Release is available",
    "link": "https://nodejs.org/en/blog/vulnerability/…",
    "type": "warning"
  },
  "all": {
    "startDate": "2026-01-13T00:00:00.000Z",
    "endDate":   "2026-01-20T00:00:00.000Z",
    "text": "January Security Release affects all active versions",
    "link": "https://nodejs.org/en/blog/vulnerability/…",
    "type": "warning"
  },
  "v20": {
    "startDate": "2026-04-30T00:00:00.000Z",
    "endDate":   "2027-04-30T00:00:00.000Z",
    "text": "Node.js 20 is End-of-Life",
    "link": "https://nodejs.org/en/about/previous-releases",
    "type": "error"
  }
}
```

| Field                   | Description                                                                             |
| ----------------------- | --------------------------------------------------------------------------------------- |
| key                     | Page slug (e.g. `index`), major version (e.g. `v20`), or `all` for all API doc versions |
| `startDate` / `endDate` | ISO 8601 timestamps; the banner is hidden outside this range                            |
| `text`                  | Banner message                                                                          |
| `link`                  | URL the banner links to                                                                 |
| `type`                  | Visual style: `warning` (orange) or `error` (red)                                       |

### `websiteBadges`

A map of page slugs to badge definitions. Badges appear as small promotional labels near the page title within the given date range.

```json
"websiteBadges": {
  "index": {
    "startDate": "2025-10-30T00:00:00.000Z",
    "endDate":   "2025-11-15T00:00:00.000Z",
    "kind":  "default",
    "title": "Discover",
    "text":  "New migration guides",
    "link":  "https://nodejs.org/en/blog/migrations"
  }
}
```

| Field                   | Description                                                 |
| ----------------------- | ----------------------------------------------------------- |
| key                     | Page slug                                                   |
| `startDate` / `endDate` | ISO 8601 timestamps; the badge is hidden outside this range |
| `kind`                  | Badge style variant (e.g. `default`)                        |
| `title`                 | Short label shown before the text                           |
| `text`                  | Badge body text                                             |
| `link`                  | URL the badge links to                                      |

## How to update

1. Edit `apps/site/site.json` directly. No code changes are required for banners, badges, or new RSS feeds.
2. Date-gated content (banners and badges) activates and deactivates automatically at runtime; no re-deploy is needed once the change is live.
3. After editing, run `pnpm format` to ensure the file remains consistently formatted.

## API endpoint

The full contents of `site.json` are available at:

```
GET /api/site.json
```

The response is `application/json` and is statically cached at build time. It refreshes on each deployment.

### External consumers

The [doc-kit](https://github.com/nodejs/doc-kit) fetches this endpoint asynchronously on page load to inject banners into the Node.js API documentation site. This allows publishing announcements (security releases, EOL notices, etc.) that appear in the API docs without requiring a doc-kit release or a rebuild of the static documentation.
