import { test } from '@playwright/test';
import { expectPageVisualMatch } from '../../utils/visual/visual-checks';

test('home page visual regression', async ({ page }) => {
  await page.goto('/');
  await expectPageVisualMatch(page, 'home-page.png');
});
