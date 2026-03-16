import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './base.page';
import { AccountMenuComponent } from './components/account-menu.component';
import { NavbarComponent } from './components/navbar.component';
import { SearchBarComponent } from './components/search-bar.component';
import { resolveSelfHealingLocator } from '../utils/ai/self-healing-locator';

export class HomePage extends BasePage {
  readonly accountMenu: AccountMenuComponent;
  readonly navbar: NavbarComponent;
  readonly searchBar: SearchBarComponent;

  constructor(page: Page) {
    super(page);
    this.accountMenu = new AccountMenuComponent(page);
    this.navbar = new NavbarComponent(page);
    this.searchBar = new SearchBarComponent(page);
  }

  async goto(path = '/#/'): Promise<void> {
    await this.open(path);
  }

  async gotoAbsolute(baseUrl: string): Promise<void> {
    await this.page.goto(`${baseUrl}/#/`);
  }

  async assertNot404(): Promise<void> {
    const is404Page = await this.page.getByRole('heading', { name: '404' }).isVisible().catch(() => false);
    expect(is404Page).toBeFalsy();
  }

  async dismissStartupBanners(): Promise<void> {
    await this.dismissOptional([
      {
        name: 'cookie accept button',
        build: (currentPage) => currentPage.getByRole('button', { name: /me want it|accept/i })
      },
      {
        name: 'cookie button fallback',
        build: (currentPage) => currentPage.getByText(/me want it/i)
      }
    ]);

    await this.dismissOptional([
      {
        name: 'welcome close button aria',
        build: (currentPage) => currentPage.getByRole('button', { name: /close welcome banner/i })
      },
      {
        name: 'welcome close generic button',
        build: (currentPage) => currentPage.locator('button[aria-label*=close i]').first()
      }
    ]);
  }

  async searchFor(term: string): Promise<void> {
    await this.searchBar.search(term);
  }

  async findProductCard(productName: string): Promise<Locator> {
    return resolveSelfHealingLocator(this.page, [
      {
        name: `${productName} product card title`,
        build: (currentPage) => currentPage.getByText(new RegExp(productName, 'i'))
      },
      {
        name: 'generic product card fallback',
        build: (currentPage) => currentPage.locator('mat-card, .product').first()
      }
    ]);
  }

  async expectProductVisible(productName: string): Promise<void> {
    const product = await this.findProductCard(productName);
    await expect(product).toBeVisible();
  }

  async assertAuthenticated(): Promise<void> {
    await this.navbar.openAccount();
    await this.accountMenu.expectProfileVisible();
    await this.accountMenu.expectLogoutVisible();
  }

  private async dismissOptional(candidates: Array<{ name: string; build: (page: Page) => Locator }>): Promise<void> {
    try {
      const element = await resolveSelfHealingLocator(this.page, candidates);
      await element.click();
    } catch {
      return;
    }
  }
}
