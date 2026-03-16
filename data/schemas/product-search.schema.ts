import { JSONSchemaType } from 'ajv';

export interface ProductSearchResponse {
  status: string;
  data: Array<{
    id?: number;
    name?: string;
    description?: string;
  }>;
}

export const productSearchSchema: JSONSchemaType<ProductSearchResponse> = {
  type: 'object',
  properties: {
    status: { type: 'string' },
    data: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number', nullable: true },
          name: { type: 'string', nullable: true },
          description: { type: 'string', nullable: true }
        },
        required: [],
        additionalProperties: true
      }
    }
  },
  required: ['status', 'data'],
  additionalProperties: true
};
