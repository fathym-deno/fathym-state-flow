import { IDataProvider } from "./IDataProvider.ts";

export class Database<T> {
  constructor(
    protected dataProvider: IDataProvider<T>,
  ) {}
}
