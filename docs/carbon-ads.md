# Carbon Ads

The Website shows [Carbon Ads](https://www.carbonads.net/) through the OpenJS Foundation's Carbon Ads project for Node.js. Ads are rendered from Carbon's JSON API, directly in the visitor's browser, without any third-party script.

## Placements

| Format  | Zone key   | Where                                                       |
| ------- | ---------- | ----------------------------------------------------------- |
| Banner  | `CWBI6KJY` | Full width, above page content, on the layouts listed below |
| Sidebar | `CWBI6KJU` | Below the table of contents, from the `xl` breakpoint       |

| Layout                   | Banner | Sidebar                   |
| ------------------------ | ------ | ------------------------- |
| `about`, `article`       | Yes    | From the `xl` breakpoint  |
| `blog-post`              | Yes    | From the `xl` breakpoint  |
| `blog-category`          | Yes    | No (no right-hand column) |
| `download`               | **No** | **No**                    |
| `download-archive`       | **No** | **No**                    |
| `home`, error/404 pages  | **No** | **No**                    |
| `page` (fallback layout) | No     | No                        |

The homepage never renders any ad markup, reserves no space and makes no ad requests. Layouts opt in explicitly through `<CarbonTopBar />` before their main content. The Sidebar is rendered inside `<MetaBar />` (`apps/site/components/MetaBar.tsx`), so every layout that uses it shows the Sidebar.

On narrower screens the Sidebar is neither shown nor requested (the Top Bar covers those views). Its breakpoint is hard-coded as `(min-width: 1280px)` in `apps/site/components/CarbonAds/Sidebar.tsx` and must match the layout grids. Resizing the window back above the breakpoint requests a new Sidebar ad, which records another impression.

Learn (`/learn`) and the API docs (`/api`, `/docs`) are separate applications and are not affected by this integration.

## How it works

- `apps/site/hooks/useCarbonAd.ts` requests the ad for the current page view and sends its view beacon. A page view changes with the pathname or locale (not with hashes or query strings), so a revisited page always gets a fresh ad.
- `apps/site/components/CarbonAds/TopBar.tsx` and `apps/site/components/CarbonAds/Sidebar.tsx` render each format. No space is reserved while loading; when there is no ad (empty response, invalid data, network error or ad blocker) nothing is shown.
- The ad request itself records the impression. The `statview` beacon is sent once per page view after at least 50% of the ad was visible for one continuous second. Clicks go through `statlink`.

## Staging and production

By default, every request is sent with `ignore=yes`, which returns a real ad **without counting the impression**. This applies to local development, tests and all preview deployments (which are production builds too).

Impressions are only counted when the build has:

```bash
NEXT_PUBLIC_CARBON_ADS_PRODUCTION=true
```

As with any `NEXT_PUBLIC_` variable, this value is embedded at build time, so it must be set in the environment of the **production deployment build only** (e.g. the Vercel "Production" environment, or the Cloudflare production build), never for previews. Changing it requires a new build. It is listed in `apps/site/turbo.json` so that it is part of the build cache key; without that, a cached preview build could be reused for production (or vice versa).

There is no Content Security Policy on the Website at the moment. If one is added, it must allow `srv.carbonads.net` (ad requests), `srv.buysellads.com` (view beacons) and the creative image host (e.g. `cdn4.buysellads.net`).

### Launch sequence

1. Deploy the integration to a staging/preview URL (impressions are not counted there).
2. Send the staging URL to Carbon for review. They serve a test creative and check requests, view beacons and click links.
3. Set `NEXT_PUBLIC_CARBON_ADS_PRODUCTION=true` for the production build and deploy.
4. For the first seven days Carbon counts traffic but serves no ads: responses are empty and the slots render nothing.
5. Paid ads then start appearing in the same slots, without code changes.

## Testing

There are no unit tests for the integration yet. When testing manually, avoid clicking real ads repeatedly; prefer intercepting `https://srv.carbonads.net/ads/*.json` with fixtures (e.g. in Playwright or the browser's developer tools).
