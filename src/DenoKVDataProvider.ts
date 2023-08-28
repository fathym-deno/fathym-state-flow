import { IDataProvider } from "./IDataProvider.ts";

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

  async query(query: any): Promise<T[]> {
    // Implement query logic here
    return [];
  }
}