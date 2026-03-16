import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { users } from '../../data/users';
import { BaseApiClient } from '../../utils/api/base-api.client';
import { authTokenSchema, type AuthTokenResponse } from '../../data/schemas/auth-token.schema';
import { expectPageVisualMatch } from '../../utils/visual/visual-checks';
import { resolveSelfHealingLocator } from '../../utils/ai/self-healing-locator';

test('hybrid flow: API auth + UI login + visual baseline', async ({ page }) => {
  const api = new BaseApiClient(process.env.API_BASE_URL ?? process.env.BASE_URL ?? '');
  await api.init();

  const authResponse = await api.post<AuthTokenResponse>(
    '/auth/login',
    {
      username: users.standard.username,
      password: users.standard.password
    },
    false
  );

  api.validateSchema(authTokenSchema, authResponse);
  api.setToken(authResponse.token);

  await page.addInitScript((token: string) => {
    window.localStorage.setItem('jwt', token);
  }, authResponse.token);

  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(users.standard);

  const dashboardAnchor = await resolveSelfHealingLocator(page, [
    {
      name: 'dashboard test id',
      build: (currentPage) => currentPage.getByTestId('dashboard-title')
    },
    {
      name: 'dashboard heading',
      build: (currentPage) => currentPage.getByRole('heading', { name: /dashboard|welcome/i })
    },
    {
      name: 'dashboard text fallback',
      build: (currentPage) => currentPage.getByText(/dashboard|welcome back/i)
    }
  ]);

  await expect(dashboardAnchor).toBeVisible();
  await expectPageVisualMatch(page, 'dashboard-after-login.png');

  await api.dispose();
});
