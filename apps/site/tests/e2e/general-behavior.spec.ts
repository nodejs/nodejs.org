import { importLocale } from '@node-core/website-i18n';
import type { Locale } from '@node-core/website-i18n/types';
import { test, expect, type Page } from '@playwright/test';

const englishLocale = await importLocale('en');

// TODO(@avivkeller): It would be ideal for all the Test IDs to not exist in the
//                    ui-components package, and instead be passed as props.
const locators = {
  // Navigation elements
  mobileMenuToggleName:
    englishLocale.components.containers.navBar.controls.toggle,
  navLinksLocator: `[aria-label="${englishLocale.components.containers.navBar.controls.toggle}"] + div`,
  // Global UI controls
  languageDropdownName: englishLocale.components.common.languageDropdown.label,
  themeToggleName: englishLocale.components.common.themeToggle.label,

  // Search components (from Orama library)
  searchButtonTag: 'orama-button',
  searchInputTag: 'orama-input',
  searchResultsTag: 'orama-search-results',
};

const getTheme = (page: Page) =>
  page.evaluate(() => document.documentElement.dataset.theme);

const openLanguageMenu = async (page: Page) => {
  const button = page.getByRole('button', {
    name: locators.languageDropdownName,
  });
  const selector = `[aria-labelledby=${await button.getAttribute('id')}]`;
  await button.click();

  await page.waitForSelector(selector);
  return page.locator(selector);
};

const verifyTranslation = async (page: Page, locale: Locale | string) => {
  // Load locale data if string code provided (e.g., 'es', 'fr')
  const localeData =
    typeof locale === 'string' ? await importLocale(locale) : locale;

  // Get navigation links and expected translations
  const links = await page
    .locator(locators.navLinksLocator)
    .locator('a > span')
    .all();
  const expectedTexts = Object.values(
    localeData.components.containers.navBar.links
  );

  // Verify each navigation link text matches an expected translation
  for (const link of links) {
    const linkText = await link.textContent();
    expect(expectedTexts).toContain(linkText!.trim());
  }
};

test.describe('Node.js Website', () => {
  // Start each test from the English homepage
  test.beforeEach(async ({ page }) => {
    await page.goto('/en');
  });

  test.describe('Theme', () => {
    test('should toggle between light/dark themes', async ({ page }) => {
      const themeToggle = page.getByRole('button', {
        name: locators.themeToggleName,
      });
      await expect(themeToggle).toBeVisible();

      const initialTheme = await getTheme(page);
      await themeToggle.click();

      const newTheme = await getTheme(page);
      expect(newTheme).not.toEqual(initialTheme);
      expect(['light', 'dark']).toContain(newTheme);
    });

    test('should persist theme across page navigation', async ({ page }) => {
      const themeToggle = page.getByRole('button', {
        name: locators.themeToggleName,
      });
      await themeToggle.click();
      const selectedTheme = await getTheme(page);

      await page.reload();
      expect(await getTheme(page)).toBe(selectedTheme);
    });

    test('should respect system preference initially', async ({ browser }) => {
      const context = await browser.newContext({ colorScheme: 'dark' });
      const page = await context.newPage();

      await page.goto('/en');
      expect(await getTheme(page)).toBe('dark');

      await context.close();
    });
  });

  test.describe('Language', () => {
    test('should correctly translate UI elements according to language files', async ({
      page,
    }) => {
      await verifyTranslation(page, englishLocale);

      // Change to Spanish and verify translations
      const menu = await openLanguageMenu(page);
      await menu.getByText(/español/i).click();
      await page.waitForURL(/\/es$/);

      await verifyTranslation(page, 'es');
    });
  });

  test.describe('Search', () => {
    test('should show and operate search functionality', async ({ page }) => {
      // Open search dialog
      await page.locator(locators.searchButtonTag).click();

      // Verify search input is visible and enter a search term
      const searchInput = page.locator(locators.searchInputTag);
      await expect(searchInput).toBeVisible();
      await searchInput.pressSequentially('express');

      // Verify search results appear
      const searchResults = page.locator(locators.searchResultsTag);
      await expect(searchResults).toBeVisible();
    });
  });

  test.describe('Navigation', () => {
    test('should have functioning mobile menu on small screens', async ({
      page,
    }) => {
      // Set mobile viewport size
      await page.setViewportSize({ width: 375, height: 667 });

      // Locate mobile menu toggle button and verify it's visible
      const mobileToggle = page.getByRole('button', {
        name: locators.mobileMenuToggleName,
      });
      await expect(mobileToggle).toBeVisible();

      const navLinks = page.locator(locators.navLinksLocator);

      // Toggle menu open and verify it's visible
      await mobileToggle.click();
      await expect(navLinks.first()).toBeVisible();

      // Toggle menu closed and verify it's hidden
      await mobileToggle.click();
      await expect(navLinks.first()).not.toBeVisible();
    });
  });
});
