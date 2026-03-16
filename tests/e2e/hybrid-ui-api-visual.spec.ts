import { test, expect } from '@playwright/test';
import { BaseApiClient } from '../../utils/api/base-api.client';
import { productSearchSchema, type ProductSearchResponse } from '../../data/schemas/product-search.schema';
import { expectPageVisualMatch } from '../../utils/visual/visual-checks';
import { resolveSelfHealingLocator } from '../../utils/ai/self-healing-locator';

test('hybrid flow: API products + UI search + visual baseline', async ({ page }) => {
  const apiBaseUrl = process.env.API_BASE_URL ?? process.env.BASE_URL ?? 'https://demo.owasp-juice.shop';

  try {
    const probe = await fetch(`${apiBaseUrl}/rest/products/search?q=apple`);
    test.skip(probe.status >= 500, `Public demo unavailable (status: ${probe.status})`);
  } catch {
    test.skip(true, 'Public demo unavailable (network error)');
  }

  const api = new BaseApiClient(apiBaseUrl);
  await api.init();

  const apiResponse = await api.get<ProductSearchResponse>('/rest/products/search?q=apple', false);
  api.validateSchema(productSearchSchema, apiResponse);
  expect(apiResponse.data.length).toBeGreaterThan(0);

  await page.goto('/#/');

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

  const searchInput = await resolveSelfHealingLocator(page, [
    {
      name: 'search input by aria label',
      build: (currentPage) => currentPage.getByRole('searchbox', { name: /search/i })
    },
    {
      name: 'search input by placeholder',
      build: (currentPage) => currentPage.getByPlaceholder(/search/i)
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
  await expectPageVisualMatch(page, 'juice-shop-search-apple.png');

  await api.dispose();
});
