import { test, expect } from '@playwright/test';
import { BaseApiClient } from '../../utils/api/base-api.client';
import { productSearchSchema, type ProductSearchResponse } from '../../data/schemas/product-search.schema';
import { expectPageVisualMatch } from '../../utils/visual/visual-checks';
import { resolveSelfHealingLocator } from '../../utils/ai/self-healing-locator';

test('hybrid flow: API products + UI search + visual baseline', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });

  const apiBaseUrl = process.env.API_BASE_URL ?? process.env.BASE_URL ?? 'http://localhost:3000';

  try {
    const probe = await fetch(`${apiBaseUrl}/rest/products/search?q=apple`);
    test.skip(!probe.ok, `Target API unavailable or invalid (status: ${probe.status})`);
  } catch {
    test.skip(true, 'Target API unavailable (network error)');
  }

  const api = new BaseApiClient(apiBaseUrl);
  await api.init();

  const apiResponse = await api.get<ProductSearchResponse>('/rest/products/search?q=apple', false);
  api.validateSchema(productSearchSchema, apiResponse);
  expect(apiResponse.data.length).toBeGreaterThan(0);

  await page.goto(`${apiBaseUrl}/#/`);

  const is404Page = await page.getByRole('heading', { name: '404' }).isVisible().catch(() => false);
  test.skip(is404Page, `Target URL is not serving Juice Shop: ${apiBaseUrl}`);

  try {
    const dismissCookieButton = await resolveSelfHealingLocator(page, [
      {
        name: 'cookie accept button',
        build: (currentPage) => currentPage.getByRole('button', { name: /me want it|accept/i })
      },
      {
        name: 'cookie button fallback',
        build: (currentPage) => currentPage.getByText(/me want it/i)
      }
    ]);
    await dismissCookieButton.click();
  } catch {
  }

  try {
    const dismissWelcomeButton = await resolveSelfHealingLocator(page, [
      {
        name: 'welcome close button aria',
        build: (currentPage) => currentPage.getByRole('button', { name: /close welcome banner/i })
      },
      {
        name: 'welcome close generic button',
        build: (currentPage) => currentPage.locator('button[aria-label*=close i]').first()
      }
    ]);
    await dismissWelcomeButton.click();
  } catch {
  }

  try {
    const openSearchButton = await resolveSelfHealingLocator(page, [
      {
        name: 'search toggle by helper text',
        build: (currentPage) => currentPage.getByText(/click to search/i)
      },
      {
        name: 'search toggle by aria label',
        build: (currentPage) => currentPage.getByRole('button', { name: /search/i }).first()
      },
      {
        name: 'search icon fallback',
        build: (currentPage) => currentPage.locator('mat-icon:has-text("search")').first()
      }
    ]);
    await openSearchButton.click();
  } catch {
  }

  const searchInput = await resolveSelfHealingLocator(page, [
    {
      name: 'search input by aria label',
      build: (currentPage) => currentPage.getByRole('searchbox', { name: /search/i })
    },
    {
      name: 'search input by placeholder',
      build: (currentPage) => currentPage.getByPlaceholder(/search/i)
    },
    {
      name: 'search input editable text field',
      build: (currentPage) => currentPage.locator('input[type="text"]:not([disabled])').first()
    },
    {
      name: 'search input angular material fallback',
      build: (currentPage) => currentPage.locator('mat-form-field input:not([disabled])').first()
    }
  ]);

  await searchInput.fill('apple');

  const productAnchor = await resolveSelfHealingLocator(page, [
    {
      name: 'apple product card title',
      build: (currentPage) => currentPage.getByText(/apple juice/i)
    },
    {
      name: 'generic product card fallback',
      build: (currentPage) => currentPage.locator('mat-card, .product').first()
    }
  ]);

  await expect(productAnchor).toBeVisible();
  await expectPageVisualMatch(page, 'juice-shop-search-apple-viewport.png');

  await api.dispose();
});
