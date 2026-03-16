import { test } from '@playwright/test';
import { HomePage } from '../../pages/home.page';
import { expectPageVisualMatch } from '../../utils/visual/visual-checks';

test('home page visual regression', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });

  const homePage = new HomePage(page);
  await homePage.goto();
  await homePage.dismissStartupBanners();
  await expectPageVisualMatch(page, 'home-page.png');
});
