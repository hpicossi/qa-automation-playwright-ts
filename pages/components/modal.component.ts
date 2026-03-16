import { expect, type Locator, type Page } from '@playwright/test';

export class ModalComponent {
  readonly root: Locator;
  readonly closeButton: Locator;
  readonly confirmButton: Locator;

  constructor(page: Page, modalTestId = 'modal') {
    this.root = page.getByTestId(modalTestId);
    this.closeButton = this.root.getByRole('button', { name: /close/i });
    this.confirmButton = this.root.getByRole('button', { name: /confirm|ok|accept/i });
  }

  async expectVisible(): Promise<void> {
    await expect(this.root).toBeVisible();
  }

  async close(): Promise<void> {
    await this.closeButton.click();
  }

  async confirm(): Promise<void> {
    await this.confirmButton.click();
  }
}
