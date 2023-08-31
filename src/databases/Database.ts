import { IDataProvider } from "./IDataProvider.ts";
import { DatabaseRecords } from "./DatabaseRecords.ts";

export type DatabaseRecordsFactory<T> = (
  key: string | (string | number)[],
) => DatabaseRecords<T>;

export type DatabaseRecordsFactoryList<T> = {
  List?: (prefix?: (string | number)[]) => Promise<{
    key: (string | number)[];
    value: T;
  }[]>;
};

export type DatabaseRecordsFactoryFull<T> =
  & DatabaseRecordsFactory<T>
  & DatabaseRecordsFactoryList<T>;

export class Database {
  constructor(protected dataProviderFactory: <T>() => IDataProvider<T>) {
  }

  protected loadRecords<T>(
    keyRoot: string | (string | number)[],
  ): DatabaseRecords<T> {
    keyRoot = typeof keyRoot === "string" ? [keyRoot] : keyRoot;

    const records = new DatabaseRecords<T>(
      keyRoot,
      this.dataProviderFactory<T>(),
    );

    return records;
  }

  protected loadRecordsFactory<
    TFactory extends DatabaseRecordsFactoryFull<T>,
    T,
  >(
    keyRoot: string | (string | number)[],
  ): TFactory {
    keyRoot = typeof keyRoot === "string" ? [keyRoot] : keyRoot;

    const factoried: DatabaseRecordsFactoryFull<T> = (
      key: string | (string | number)[],
    ): DatabaseRecords<T> => {
      key = typeof key === "string" ? [key] : key;

      return this.loadRecords<T>([...keyRoot, ...key]);
    };

    factoried.List = this.factoriedList(keyRoot);

    return factoried as TFactory;
  }

  protected factoriedList<User>(keyRoot: (string | number)[]) {
    return async (
      prefix?: (string | number)[],
    ): Promise<{
      key: (string | number)[];
      value: User;
    }[]> => {
      const dataProvider = this.dataProviderFactory<User>();

      const listed = await dataProvider.List([...keyRoot, ...(prefix || [])]);

      return listed.map((l) => {
        return {
          key: l.key,
          value: l.value,
        };
      });
    };
  }
}
