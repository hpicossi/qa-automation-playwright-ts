import path from 'path';
import { test as setup, expect } from '@playwright/test';
import { users } from '../../data/users';
import { JuiceShopAuthClient } from '../../utils/api/juice-shop-auth.client';
import { loginAuthSchema } from '../../data/schemas/login-auth.schema';

const authFile = path.join(process.cwd(), 'playwright', '.auth', 'customer.json');

setup('create reusable authenticated session', async ({ page }) => {
  const baseUrl = process.env.API_BASE_URL ?? process.env.BASE_URL ?? 'http://localhost:3000';
  const authClient = new JuiceShopAuthClient(baseUrl);
  await authClient.init();

  await authClient.ensureRegistered(users.standard.email, users.standard.password);
  const loginResponse = await authClient.login(users.standard.email, users.standard.password);
  authClient.validateSchema(loginAuthSchema, loginResponse);
  authClient.setToken(loginResponse.authentication.token);

  await page.goto(`${baseUrl}/#/login`);
  await page.evaluate((token: string) => {
    window.localStorage.setItem('token', token);
  }, loginResponse.authentication.token);
  await page.context().storageState({ path: authFile });

  expect(loginResponse.authentication.umail).toBe(users.standard.email);
  await authClient.dispose();
});
