import { IDataProvider } from "../IDataProvider.ts";
import { JsonSchema } from "../JsonSchema.ts";

export class DenoKVDataProvider<T> implements IDataProvider<T> {
  constructor(private kv: Deno.Kv) {}

  public async Set(key: (string | number)[], value: T): Promise<void> {
    await this.kv.set(key, value);
  }

  public async Get(key: (string | number)[]): Promise<T | undefined> {
    const res = await this.kv.get(key);
    return res ? (res.value as T) : undefined;
  }

  public async Delete(key: (string | number)[]): Promise<void> {
    await this.kv.delete(key);
  }

  public Query(_query: JsonSchema): Promise<T[]> {
    return Promise.resolve([]);
  }

  /**
   * Lists the values for the given prefix from the data provider.
   *
   * @param prefix The prefix as an array of string or number.
   * @returns A promise that resolves with an array of values that match the prefix.
   */
  public async List(
    prefix: (string | number)[],
  ): Promise<{ key: (string | number)[]; value: T }[]> {
    const iter = this.kv.list({ prefix });

    const values: { key: (string | number)[]; value: T }[] = [];

    for await (const res of iter) {
      values.push({
        key: res.key.map((k) => k.toString()),
        value: res.value as T,
      });
    }

    return values;
  }
}
