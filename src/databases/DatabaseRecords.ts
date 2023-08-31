import { IDataProvider } from "./IDataProvider.ts";

export class Database {
}

export class DatabaseRecords<T> {
  constructor(
    protected keyRoot: (string | number)[],
    protected dataProvider: IDataProvider<T>,
  ) {}

  public async Get(key: string | (string | number)[]): Promise<T | undefined> {
    const keys = typeof key === "string" ? [key] : key;

    const tKey = [...this.keyRoot, ...keys];

    return await this.dataProvider.Get(tKey);
  }

  public async Set(key: string | (string | number)[], value: T): Promise<void> {
    const keys = typeof key === "string" ? [key] : key;

    const tKey = [...this.keyRoot, ...keys];

    await this.dataProvider.Set(tKey, value);
  }
}
