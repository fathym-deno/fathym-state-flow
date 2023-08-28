import { IDataProvider } from "./IDataProvider.ts";
import { JsonSchema } from "./JsonSchema.ts";

export class DenoKVDataProvider<T> implements IDataProvider<T> {
  constructor(private kv: Deno.Kv) {}

  async set(key: string, value: T): Promise<void> {
    await this.kv.set([key], value);
  }

  async get(key: string): Promise<T | null> {
    const res = await this.kv.get([key]);
    return res ? (res.value as T) : null;
  }

  async delete(key: string): Promise<void> {
    await this.kv.delete([key]);
  }

  async query(query: JsonSchema): Promise<T[]> {
    // Implement query logic here
    return [];
  }

  /**
   * Lists the values for the given prefix from the data provider.
   * 
   * @param prefix The prefix as an array of string or number.
   * @returns A promise that resolves with an array of values that match the prefix.
   */
  async list(prefix: (string | number)[]): Promise<T[]> {
    const iter = this.kv.list({ prefix });
    const values = [];
    for await (const res of iter) {
      values.push(res.value as T);
    }
    return values;
  }
}