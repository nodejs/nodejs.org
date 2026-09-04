import { expect, test } from '@playwright/test';

test('code tabs support keyboard selection, deep links, and browser history', async ({
  page,
}) => {
  await page.goto('/en');
  const tabs = page
    .getByRole('tablist', { name: 'Code samples' })
    .getByRole('tab');
  const first = tabs.first();
  const second = tabs.nth(1);
  const firstId = await first.getAttribute('aria-controls');
  const secondId = await second.getAttribute('aria-controls');

  await first.focus();
  await page.keyboard.press('ArrowRight');
  await expect(second).toBeFocused();
  await expect(second).toHaveAttribute('aria-selected', 'true');
  await expect(page.locator(`[id="${secondId}"]`)).toBeVisible();
  await expect(page.locator(`[id="${firstId}"]`)).toBeHidden();

  await page.reload();
  await expect(second).toHaveAttribute('aria-selected', 'true');
  await expect(page.locator(`[id="${secondId}"]`)).toBeVisible();
  await first.click();
  await expect(page.locator(`[id="${firstId}"]`)).toBeVisible();
  await page.goBack();
  await expect(second).toHaveAttribute('aria-selected', 'true');
  await expect(page.locator(`[id="${secondId}"]`)).toBeVisible();
  await page.goForward();
  await expect(first).toHaveAttribute('aria-selected', 'true');
  await expect(page.locator(`[id="${firstId}"]`)).toBeVisible();
});

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('native links select visible panels and survive a reload', async ({
    page,
  }) => {
    await page.goto('/en');
    const links = page
      .getByRole('navigation', { name: 'Code samples' })
      .getByRole('link');
    const firstId = await links.first().getAttribute('aria-controls');
    const second = links.nth(1);
    const secondId = await second.getAttribute('aria-controls');
    await expect(page.locator(`[id="${firstId}"]`)).toBeVisible();
    await expect(page.locator(`[id="${secondId}"]`)).toBeHidden();
    await second.click();
    await expect(page.locator(`[id="${secondId}"]`)).toBeVisible();
    await expect(page.locator(`[id="${firstId}"]`)).toBeHidden();
    await page.reload();
    await expect(page.locator(`[id="${secondId}"]`)).toBeVisible();
    await expect(page.locator(`[id="${firstId}"]`)).toBeHidden();
  });
});
