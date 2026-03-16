import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home.page';
import { BaseApiClient } from '../../utils/api/base-api.client';
import { productSearchSchema, type ProductSearchResponse } from '../../data/schemas/product-search.schema';
import { expectPageVisualMatch } from '../../utils/visual/visual-checks';

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

  const homePage = new HomePage(page);
  await homePage.gotoAbsolute(apiBaseUrl);
  await homePage.assertNot404();
  await homePage.dismissStartupBanners();
  await homePage.searchFor('apple');
  await homePage.expectProductVisible('apple juice');
  await expectPageVisualMatch(page, 'juice-shop-search-apple-viewport.png');

  await api.dispose();
});
