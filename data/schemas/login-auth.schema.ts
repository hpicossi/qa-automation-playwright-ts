import { JSONSchemaType } from 'ajv';

export interface LoginAuthResponse {
  authentication: {
    token: string;
    bid: number;
    umail: string;
  };
}

export const loginAuthSchema: JSONSchemaType<LoginAuthResponse> = {
  type: 'object',
  properties: {
    authentication: {
      type: 'object',
      properties: {
        token: { type: 'string' },
        bid: { type: 'number' },
        umail: { type: 'string' }
      },
      required: ['token', 'bid', 'umail'],
      additionalProperties: true
    }
  },
  required: ['authentication'],
  additionalProperties: true
};
