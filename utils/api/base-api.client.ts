import { APIRequestContext, APIResponse, expect, request } from '@playwright/test';
import Ajv, { JSONSchemaType } from 'ajv';

export interface AuthPayload {
  username: string;
  password: string;
}

export class BaseApiClient {
  private context!: APIRequestContext;
  private token: string | null = null;
  private readonly ajv = new Ajv();

  constructor(private readonly baseURL: string) {}

  async init(): Promise<void> {
    this.context = await request.newContext({
      baseURL: this.baseURL,
      extraHTTPHeaders: {
        'Content-Type': 'application/json'
      }
    });
  }

  async dispose(): Promise<void> {
    await this.context.dispose();
  }

  setToken(token: string): void {
    this.token = token;
  }

  async loginAndStoreJwt(path: string, payload: AuthPayload, tokenField = 'token'): Promise<string> {
    const response = await this.post<Record<string, unknown>>(path, payload, false);
    const token = String(response[tokenField] ?? '');

    expect(token.length).toBeGreaterThan(0);
    this.setToken(token);

    return token;
  }

  async get<T>(path: string, authorized = true): Promise<T> {
    const response = await this.context.get(path, {
      headers: this.buildAuthHeaders(authorized)
    });

    await this.assertOk(response);
    return (await response.json()) as T;
  }

  async post<T>(path: string, body: unknown, authorized = true): Promise<T> {
    const response = await this.context.post(path, {
      data: body,
      headers: this.buildAuthHeaders(authorized)
    });

    await this.assertOk(response);
    return (await response.json()) as T;
  }

  validateSchema<T>(schema: JSONSchemaType<T>, data: unknown): void {
    const validate = this.ajv.compile(schema);
    const isValid = validate(data);
    expect(isValid, JSON.stringify(validate.errors)).toBeTruthy();
  }

  private buildAuthHeaders(authorized: boolean): Record<string, string> {
    if (!authorized || !this.token) {
      return {};
    }

    return {
      Authorization: `Bearer ${this.token}`
    };
  }

  private async assertOk(response: APIResponse): Promise<void> {
    expect(response.ok(), `API request failed: ${response.status()} ${response.statusText()}`).toBeTruthy();
  }
}
