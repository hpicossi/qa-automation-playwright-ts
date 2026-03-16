import { expect } from '@playwright/test';
import { BaseApiClient } from './base-api.client';
import { type LoginAuthResponse } from '../../data/schemas/login-auth.schema';

interface RegistrationPayload {
  email: string;
  password: string;
  passwordRepeat: string;
  securityQuestion: {
    id: number;
    question: string;
  };
  securityAnswer: string;
}

export class JuiceShopAuthClient extends BaseApiClient {
  async ensureRegistered(email: string, password: string): Promise<void> {
    const payload: RegistrationPayload = {
      email,
      password,
      passwordRepeat: password,
      securityQuestion: {
        id: 1,
        question: 'Your eldest siblings middle name?'
      },
      securityAnswer: 'portfolio'
    };

    const response = await this.postRaw('/api/Users/', payload, false);
    expect([201, 400, 409]).toContain(response.status());
  }

  async login(email: string, password: string): Promise<LoginAuthResponse> {
    return this.post<LoginAuthResponse>(
      '/rest/user/login',
      {
        email,
        password
      },
      false
    );
  }
}
