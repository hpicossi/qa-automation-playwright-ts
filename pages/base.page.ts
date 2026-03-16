import { type Locator, type Page } from '@playwright/test';

export abstract class BasePage {
  protected readonly page: Page;

  protected constructor(page: Page) {
    this.page = page;
  }

  async open(path = ''): Promise<void> {
    await this.page.goto(path);
  }

  async click(locator: Locator): Promise<void> {
    await locator.click();
  }

  async type(locator: Locator, value: string): Promise<void> {
    await locator.fill(value);
  }

  async text(locator: Locator): Promise<string> {
    return (await locator.textContent())?.trim() ?? '';
  }
}
