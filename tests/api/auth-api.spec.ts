import { test } from '@playwright/test';
import { BaseApiClient } from '../../utils/api/base-api.client';
import { productSearchSchema, type ProductSearchResponse } from '../../data/schemas/product-search.schema';

test('products search API returns valid public contract', async () => {
  const apiBaseUrl = process.env.API_BASE_URL ?? process.env.BASE_URL ?? 'https://demo.owasp-juice.shop';

  try {
    const probe = await fetch(`${apiBaseUrl}/rest/products/search?q=apple`);
    test.skip(probe.status >= 500, `Public demo unavailable (status: ${probe.status})`);
  } catch {
    test.skip(true, 'Public demo unavailable (network error)');
  }

  const api = new BaseApiClient(apiBaseUrl);
  await api.init();

  const response = await api.get<ProductSearchResponse>('/rest/products/search?q=apple', false);

  api.validateSchema(productSearchSchema, response);
  await api.dispose();
});
