import { JSONSchemaType } from 'ajv';

export interface AuthTokenResponse {
  token: string;
}

export const authTokenSchema: JSONSchemaType<AuthTokenResponse> = {
  type: 'object',
  properties: {
    token: { type: 'string' }
  },
  required: ['token'],
  additionalProperties: true
};
