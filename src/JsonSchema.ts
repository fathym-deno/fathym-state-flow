/**
 * Represents a JSON Schema which is a powerful tool for validating the structure of JSON data.
 * @example
 * const schema: JsonSchema = {
 *   $id: "https://example.com/person.schema.json",
 *   $schema: "http://json-schema.org/draft-07/schema#",
 *   title: "Person",
 *   type: "object",
 *   properties: {
 *     firstName: {
 *       type: "string",
 *       description: "The person's first name."
 *     },
 *     lastName: {
 *       type: "string",
 *       description: "The person's last name."
 *     },
 *     age: {
 *       description: "Age in years which must be equal to or greater than zero.",
 *       type: "integer",
 *       minimum: 0
 *     }
 *   }
 * };
 */
export type JsonSchema = {
  /**
   * A URI that identifies the schema. This id should be unique across the schemas.
   */
  $id?: string;
  /**
   * The URI of the schema that the current schema is derived from.
   */
  $schema?: string;
  /**
   * The title of the schema.
   */
  title?: string;
  /**
   * A description of the schema.
   */
  description?: string;
  /**
   * The type of data that the schema defines. Can be "string", "number", "object", "array", "boolean", "null", "integer".
   */
  type?: string;
  /**
   * An object that holds the definition of each property in the schema.
   */
  properties?: {
    [key: string]: JsonSchema;
  };
  /**
   * Specifies whether additional properties on the object are allowed, and if so, the schema that these additional properties should conform to.
   */
  additionalProperties?: boolean | JsonSchema;
  /**
   * An array of strings that lists the names of all properties that must be present on the object.
   */
  required?: string[];
  /**
   * The schema for the items in the array.
   */
  items?: JsonSchema | JsonSchema[];
  /**
   * The minimum number of items that the array must have.
   */
  minItems?: number;
  /**
   * The maximum number of items that the array can have.
   */
  maxItems?: number;
  /**
   * If true, all items in the array must be unique.
   */
  uniqueItems?: boolean;
  /**
   * An array that lists the possible values for the data.
   */
  enum?: Record<string, unknown>[];
  /**
   * The default value for the data.
   */
  default?: Record<string, unknown>;
  /**
   * A format that the data must adhere to.
   */
  format?: string;
  /**
   * A reference to another schema.
   */
  $ref?: string;
  /**
   * An object that holds the definition of named schemas.
   */
  definitions?: {
    [key: string]: JsonSchema;
  };
  /**
   * An object that holds the definition of each property that matches the pattern properties.
   */
  patternProperties?: {
    [key: string]: JsonSchema;
  };
  /**
   * An object that holds the definition of each property that the data depends on.
   */
  dependencies?: {
    [key: string]: JsonSchema | string[];
  };
  /**
   * The minimum value that the data can be.
   */
  minimum?: number;
  /**
   * The maximum value that the data can be.
   */
  maximum?: number;
  /**
   * If present, the data must be greater than this value.
   */
  exclusiveMinimum?: number;
  /**
   * If present, the data must be less than this value.
   */
  exclusiveMaximum?: number;
  /**
   * The number that the data should be a multiple of.
   */
  multipleOf?: number;
  /**
   * The minimum length of the string.
   */
  minLength?: number;
  /**
   * The maximum length of the string.
   */
  maxLength?: number;
  /**
   * A regular expression that the string should match.
   */
  pattern?: string;
  /**
   * The minimum number of properties the object should have.
   */
  minProperties?: number;
  /**
   * The maximum number of properties the object can have.
   */
  maxProperties?: number;
  /**
   * An array of schemas, all of which the data must match.
   */
  allOf?: JsonSchema[];
  /**
   * An array of schemas, at least one of which the data must match.
   */
  anyOf?: JsonSchema[];
  /**
   * An array of schemas, exactly one of which the data must match.
   */
  oneOf?: JsonSchema[];
  /**
   * A schema that the data must not match.
   */
  not?: JsonSchema;
};
