import { test } from '@playwright/test';
import { BaseApiClient } from '../../utils/api/base-api.client';
import { users } from '../../data/users';
import { authTokenSchema, type AuthTokenResponse } from '../../data/schemas/auth-token.schema';

test('auth API returns valid JWT contract', async () => {
  const api = new BaseApiClient(process.env.API_BASE_URL ?? process.env.BASE_URL ?? '');
  await api.init();

  const response = await api.post<AuthTokenResponse>(
    '/auth/login',
    {
      username: users.standard.username,
      password: users.standard.password
    },
    false
  );

  api.validateSchema(authTokenSchema, response);
  await api.dispose();
});
