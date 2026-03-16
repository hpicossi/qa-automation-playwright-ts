import { type Locator, type Page } from '@playwright/test';

export class NavbarComponent {
  readonly page: Page;
  readonly homeLink: Locator;
  readonly accountMenu: Locator;
  readonly cartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.homeLink = page.getByRole('link', { name: /home/i });
    this.accountMenu = page.getByRole('button', { name: /show\/hide account menu|account|profile/i });
    this.cartButton = page.getByRole('button', { name: /cart/i });
  }

  async goHome(): Promise<void> {
    await this.homeLink.click();
  }

  async openAccount(): Promise<void> {
    await this.accountMenu.click();
  }

  async openCart(): Promise<void> {
    await this.cartButton.click();
  }
}
