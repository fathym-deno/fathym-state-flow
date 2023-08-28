export type JsonSchema = {
  $id?: string;
  $schema?: string;
  title?: string;
  description?: string;
  type?: string;
  properties?: {
    [key: string]: JsonSchema;
  };
  additionalProperties?: boolean | JsonSchema;
  required?: string[];
  items?: JsonSchema | JsonSchema[];
  minItems?: number;
  maxItems?: number;
  uniqueItems?: boolean;
  enum?: any[];
  default?: any;
  format?: string;
  $ref?: string;
  definitions?: {
    [key: string]: JsonSchema;
  };
  patternProperties?: {
    [key: string]: JsonSchema;
  };
  dependencies?: {
    [key: string]: JsonSchema | string[];
  };
  minimum?: number;
  maximum?: number;
  exclusiveMinimum?: number;
  exclusiveMaximum?: number;
  multipleOf?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  minProperties?: number;
  maxProperties?: number;
  allOf?: JsonSchema[];
  anyOf?: JsonSchema[];
  oneOf?: JsonSchema[];
  not?: JsonSchema;
};