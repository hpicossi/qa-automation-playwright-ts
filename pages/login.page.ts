import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './base.page';
import { NavbarComponent } from './components/navbar.component';

interface LoginCredentials {
  username: string;
  password: string;
}

export class LoginPage extends BasePage {
  readonly navbar: NavbarComponent;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    super(page);
    this.navbar = new NavbarComponent(page);
    this.usernameInput = page.getByLabel(/user|email/i);
    this.passwordInput = page.getByLabel(/password/i);
    this.submitButton = page.getByRole('button', { name: /login|sign in/i });
  }

  async goto(): Promise<void> {
    await this.open('/login');
  }

  async login(credentials: LoginCredentials): Promise<void> {
    await this.type(this.usernameInput, credentials.username);
    await this.type(this.passwordInput, credentials.password);
    await this.click(this.submitButton);
  }

  async assertLoggedIn(): Promise<void> {
    await expect(this.navbar.accountMenu).toBeVisible();
  }
}
