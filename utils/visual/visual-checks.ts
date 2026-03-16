import { expect, Locator, Page } from '@playwright/test';

function isVisualCheckEnabled(): boolean {
  if (!process.env.CI) {
    return true;
  }

  return process.env.ENABLE_VISUAL === 'true';
}

export async function expectPageVisualMatch(page: Page, snapshotName: string): Promise<void> {
  if (!isVisualCheckEnabled()) {
    return;
  }

  await expect(page).toHaveScreenshot(snapshotName, {
    fullPage: false,
    maxDiffPixelRatio: 0.01
  });
}

export async function expectRegionVisualMatch(region: Locator, snapshotName: string): Promise<void> {
  if (!isVisualCheckEnabled()) {
    return;
  }

  await expect(region).toHaveScreenshot(snapshotName, {
    maxDiffPixelRatio: 0.01
  });
}
