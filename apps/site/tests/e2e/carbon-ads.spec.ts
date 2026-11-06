import { test, expect, type Page } from '@playwright/test';

const zones = { top: 'CWBI6KJY', sidebar: 'CWBI6KJU' };

const createAd = (id: string) => ({
  company: `Company ${id}`,
  description: `Description ${id}`,
  callToAction: 'Learn more',
  image: 'https://cdn4.buysellads.net/test.png',
  largeImage: 'https://cdn4.buysellads.net/test.png',
  backgroundColor: '#ffffff',
  textColor: '#000000',
  ctaBackgroundColor: '#000000',
  ctaTextColor: '#ffffff',
  statlink: `https://srv.buysellads.com/ads/click/x/${id}`,
  statview: `https://srv.buysellads.com/ads/view/x/${id}`,
  ad_via_link: 'https://www.carbonads.net/',
});

/**
 * Serves fixtures instead of contacting Carbon Ads, and records every ad request
 */
const mockAds = async (page: Page) => {
  const requests: Array<string> = [];

  await page.route('https://srv.carbonads.net/**', route => {
    const zone = new URL(route.request().url()).pathname;
    requests.push(zone);

    return route.fulfill({
      json: { ads: [createAd(String(requests.length))] },
      headers: { 'access-control-allow-origin': '*' },
    });
  });

  await page.route('https://srv.buysellads.com/**', route =>
    route.fulfill({ body: '' })
  );

  await page.route('https://cdn4.buysellads.net/**', route =>
    route.fulfill({ body: '' })
  );

  return requests;
};

const adLinks = (page: Page) =>
  page.locator('a[href^="https://srv.buysellads.com/ads/click/"]');

test.describe('Carbon Ads', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test('should never show or request ads on the homepage', async ({ page }) => {
    const requests = await mockAds(page);

    await page.goto('/en');
    await page.waitForLoadState('networkidle');

    expect(requests).toEqual([]);
    await expect(adLinks(page)).toHaveCount(0);
  });

  test('should request each format once per page view', async ({ page }) => {
    const requests = await mockAds(page);

    await page.goto('/en/about');
    await expect(adLinks(page)).toHaveCount(2);

    expect(requests.sort()).toEqual([
      `/ads/${zones.sidebar}.json`,
      `/ads/${zones.top}.json`,
    ]);

    // Client-side navigation starts a new page view (Top Bar only)
    await page.locator('nav a[href="/en/blog"]').first().click();
    await page.waitForURL('**/en/blog');
    await expect(adLinks(page)).toHaveCount(1);
    await expect(page.getByAltText('Company 3')).toBeVisible();

    expect(requests).toHaveLength(3);

    // Navigating to the homepage removes the ads, without new requests
    await page.locator('nav a[href="/en"]').first().click();
    await page.waitForURL(/\/en$/);
    await page.waitForLoadState('networkidle');

    await expect(adLinks(page)).toHaveCount(0);
    expect(requests).toHaveLength(3);
  });

  test('should not request the Sidebar on narrow screens', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });

    const requests = await mockAds(page);

    await page.goto('/en/about');
    await expect(adLinks(page)).toHaveCount(1);

    expect(requests).toEqual([`/ads/${zones.top}.json`]);
  });

  test('should request the Sidebar from each layout breakpoint', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1000, height: 800 });

    const requests = await mockAds(page);

    // Between `ml` and `xl`, only blog posts have a right-hand column
    await page.goto('/en/about');
    await expect(adLinks(page)).toHaveCount(1);

    expect(requests).toEqual([`/ads/${zones.top}.json`]);

    requests.length = 0;

    await page.goto(
      '/en/blog/announcements/diving-into-the-nodejs-website-redesign'
    );
    await expect(adLinks(page)).toHaveCount(2);

    expect(requests.sort()).toEqual([
      `/ads/${zones.sidebar}.json`,
      `/ads/${zones.top}.json`,
    ]);
  });
});
