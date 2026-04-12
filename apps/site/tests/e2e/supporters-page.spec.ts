import { test, expect } from '@playwright/test';

test.describe('Supporters page', () => {
  test('should not return a 500 error for partners page', async ({ page }) => {
    const response = await page.goto('/en/about/partners');

    expect(response).not.toBeNull();
    expect(response?.status()).not.toBe(500);

    await expect(
      page.getByRole('heading', { name: 'Partners & Supporters', level: 1 })
    ).toBeVisible();
  });
});
