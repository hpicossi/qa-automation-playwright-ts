import { expect, Page } from '@playwright/test';

export async function expectPageVisualMatch(page: Page, snapshotName: string): Promise<void> {
  await expect(page).toHaveScreenshot(snapshotName, {
    fullPage: true,
    maxDiffPixelRatio: 0.01
  });
}
