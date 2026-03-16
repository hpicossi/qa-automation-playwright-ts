import { type Page } from '@playwright/test';
import { resolveSelfHealingLocator } from '../../utils/ai/self-healing-locator';

export class SearchBarComponent {
  constructor(private readonly page: Page) {}

  async openIfCollapsed(): Promise<void> {
    try {
      const toggle = await resolveSelfHealingLocator(this.page, [
        {
          name: 'search toggle by helper text',
          build: (currentPage) => currentPage.getByText(/click to search/i)
        },
        {
          name: 'search toggle by aria label',
          build: (currentPage) => currentPage.getByRole('button', { name: /search/i }).first()
        },
        {
          name: 'search icon fallback',
          build: (currentPage) => currentPage.locator('mat-icon:has-text("search")').first()
        }
      ]);

      await toggle.click();
    } catch {
      return;
    }
  }

  async search(term: string): Promise<void> {
    await this.openIfCollapsed();

    const input = await resolveSelfHealingLocator(this.page, [
      {
        name: 'search input by aria label',
        build: (currentPage) => currentPage.getByRole('searchbox', { name: /search/i })
      },
      {
        name: 'search input by placeholder',
        build: (currentPage) => currentPage.getByPlaceholder(/search/i)
      },
      {
        name: 'search input editable text field',
        build: (currentPage) => currentPage.locator('input[type="text"]:not([disabled])').first()
      },
      {
        name: 'search input angular material fallback',
        build: (currentPage) => currentPage.locator('mat-form-field input:not([disabled])').first()
      }
    ]);

    await input.fill(term);
  }
}
