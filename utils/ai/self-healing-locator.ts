import { expect, Locator, Page } from '@playwright/test';

export interface LocatorCandidate {
  name: string;
  build: (page: Page) => Locator;
}

export async function resolveSelfHealingLocator(
  page: Page,
  candidates: LocatorCandidate[],
  timeoutMs = 2_500
): Promise<Locator> {
  for (const candidate of candidates) {
    const locator = candidate.build(page);
    try {
      await expect(locator.first()).toBeVisible({ timeout: timeoutMs });
      return locator.first();
    } catch {
      continue;
    }
  }

  throw new Error(`No candidate locator was found. Candidates: ${candidates.map((c) => c.name).join(', ')}`);
}
