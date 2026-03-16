import { expect, Locator, Page } from '@playwright/test';

export async function expectPageVisualMatch(page: Page, snapshotName: string): Promise<void> {
  await expect(page).toHaveScreenshot(snapshotName, {
    fullPage: false,
    maxDiffPixelRatio: 0.01
  });
}

export async function expectRegionVisualMatch(region: Locator, snapshotName: string): Promise<void> {
  await expect(region).toHaveScreenshot(snapshotName, {
    maxDiffPixelRatio: 0.01
  });
}
