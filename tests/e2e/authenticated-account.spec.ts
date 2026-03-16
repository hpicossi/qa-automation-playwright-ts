import { test } from '@playwright/test';
import { HomePage } from '../../pages/home.page';

test.use({ storageState: 'playwright/.auth/customer.json' });

test('authenticated session shows profile and logout actions', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });

  const homePage = new HomePage(page);
  await homePage.goto();
  await homePage.dismissStartupBanners();
  await homePage.assertAuthenticated();
});
