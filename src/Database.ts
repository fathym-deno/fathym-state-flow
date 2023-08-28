import { IDataProvider } from "./IDataProvider.ts";
import { JsonSchema } from "./JsonSchema.ts";

export class Database<T> {
  constructor(private dataProvider: IDataProvider<T>, private schema: JsonSchema) {}

  async set(key: string, value: T): Promise<void> {
    await this.dataProvider.set(key, value);
  }

  async get(key: string): Promise<T | null> {
    return await this.dataProvider.get(key);
  }

  async delete(key: string): Promise<void> {
    await this.dataProvider.delete(key);
  }

  async query(query: JsonSchema): Promise<T[]> {
    return await this.dataProvider.query(query);
  }
}