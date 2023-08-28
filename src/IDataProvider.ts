import { JsonSchema } from './JsonSchema.ts';

/**
 * IDataProvider interface
 * 
 * This interface defines the methods for a data provider.
 * 
 * @template T The type of data to be handled by the data provider.
 */
export interface IDataProvider<T> {
  /**
   * Sets the value for the given key in the data provider.
   * 
   * @param key The key as an array of string or number.
   * @param value The value to be set.
   * @returns A promise that resolves when the operation is complete.
   */
  set(key: (string | number)[], value: T): Promise<void>;

  /**
   * Gets the value for the given key from the data provider.
   * 
   * @param key The key as an array of string or number.
   * @returns A promise that resolves with the value, or null if the key does not exist.
   */
  get(key: (string | number)[]): Promise<T | null>;

  /**
   * Deletes the value for the given key from the data provider.
   * 
   * @param key The key as an array of string or number.
   * @returns A promise that resolves when the operation is complete.
   */
  delete(key: (string | number)[]): Promise<void>;

  /**
   * Queries the data provider with the given JsonSchema.
   * 
   * @param query The JsonSchema to use for the query.
   * @returns A promise that resolves with an array of data that matches the query.
   */
  query(query: JsonSchema): Promise<T[]>;

  /**
   * Lists the values for the given prefix from the data provider.
   * 
   * @param prefix The prefix as an array of string or number.
   * @returns A promise that resolves with an array of values that match the prefix.
   */
  list(prefix: (string | number)[]): Promise<T[]>;
}