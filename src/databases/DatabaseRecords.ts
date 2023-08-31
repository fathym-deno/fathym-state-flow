import { IDataProvider } from "./IDataProvider.ts";

export class DatabaseRecords<T> {
  constructor(
    protected keyRoot: (string | number)[],
    protected dataProvider: IDataProvider<T>,
  ) {}

  public async Delete(): Promise<void> {
    await this.dataProvider.Delete(this.keyRoot);
  }

  public async Get(): Promise<T | undefined> {
    return await this.dataProvider.Get(this.keyRoot);
  }

  public async Set(value: T): Promise<void> {
    await this.dataProvider.Set(this.keyRoot, value);
  }
}
