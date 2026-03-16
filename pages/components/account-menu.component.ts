import { expect, type Locator, type Page } from '@playwright/test';

export class AccountMenuComponent {
  readonly profileItem: Locator;
  readonly logoutItem: Locator;

  constructor(page: Page) {
    this.profileItem = page.getByRole('menuitem', { name: /go to user profile/i });
    this.logoutItem = page.getByRole('menuitem', { name: /logout/i });
  }

  async expectProfileVisible(): Promise<void> {
    await expect(this.profileItem).toBeVisible();
  }

  async expectLogoutVisible(): Promise<void> {
    await expect(this.logoutItem).toBeVisible();
  }
}
