import { importLocale } from '@node-core/website-i18n';
import { test, expect, type Page } from '@playwright/test';

// TODO(@avivkeller): It would be ideal for all the Test IDs to not exist in the
//                    ui-components package, and instead be passed as props.
const testIds = {
  themeToggle: 'theme-toggle',
  languageDropdown: 'language-selector',
  languageOptions: 'language-options',
  navLinks: 'nav-links',
  mobileMenuToggle: 'mobile-menu-toggle',
};

// These are inherited from Orama, so they don't have test IDs. Instead, we use the element names directly
const selectors = {
  searchButton: 'orama-button',
  searchInput: 'orama-input',
  searchResults: 'orama-search-results',
};

// Helper functions
const getTheme = (page: Page) =>
  page.evaluate(() => document.documentElement.dataset.theme);

const openLanguageMenu = async (page: Page) => {
  await page.getByTestId(testIds.languageDropdown).first().click();
  await page.waitForSelector(`data-testid=${testIds.languageOptions}`);
};

const verifyTranslation = async (page: Page, locale: string) => {
  const localeData = await importLocale(locale);

  // Get all navigation links
  const links = await page.getByTestId(testIds.navLinks).locator('a').all();
  const expectedTexts = Object.values(
    localeData.components.containers.navBar.links
  );

  // For each link, verify its text is in the expected translations
  for (const link of links) {
    const linkText = await link.textContent();
    expect(expectedTexts).toContain(linkText!.trim());
  }
};

test.describe('Node.js Website', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/en');
  });

  test.describe('Theme', () => {
    test('should toggle between light/dark themes', async ({ page }) => {
      const themeToggle = page.getByTestId(testIds.themeToggle).first();
      await expect(themeToggle).toBeVisible();

      const initialTheme = await getTheme(page);
      await themeToggle.click();

      const newTheme = await getTheme(page);
      expect(newTheme).not.toEqual(initialTheme);
      expect(['light', 'dark']).toContain(newTheme);
    });

    test('should persist theme across page navigation', async ({ page }) => {
      const themeToggle = page.getByTestId(testIds.themeToggle).first();
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
      // Verify English content
      await verifyTranslation(page, 'en');

      // Change to Spanish and verify
      await openLanguageMenu(page);
      await page
        .getByTestId(testIds.languageOptions)
        .getByText(/español/i)
        .click();
      await page.waitForURL(/\/es$/);

      await verifyTranslation(page, 'es');
    });
  });

  test.describe('Search', () => {
    test('should show and operate search functionality', async ({ page }) => {
      await page.locator(selectors.searchButton).click();

      const searchInput = page.locator(selectors.searchInput);
      await expect(searchInput).toBeVisible();
      await searchInput.pressSequentially('express');

      const searchResults = page.locator(selectors.searchResults);
      await expect(searchResults).toBeVisible();
    });
  });

  test.describe('Navigation', () => {
    test('should have functioning mobile menu on small screens', async ({
      page,
    }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });

      const mobileToggle = page.getByTestId(testIds.mobileMenuToggle);
      await expect(mobileToggle).toBeVisible();

      const navLinks = page.getByTestId(testIds.navLinks);

      // Toggle menu open and verify
      await mobileToggle.click();
      await expect(navLinks.first()).toBeVisible();

      // Toggle menu closed and verify
      await mobileToggle.click();
      await expect(navLinks.first()).not.toBeVisible();
    });
  });
});
