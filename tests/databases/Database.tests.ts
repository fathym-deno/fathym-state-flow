import { TsConfigResolver } from "https://deno.land/x/ts_morph@18.0.0/common/ts_morph_common.js";
import {
  Database,
  DatabaseRecorder,
  DatabaseRecords,
} from "../../src/databases/DatabaseRecords.ts";
import { IDataProvider } from "../../src/databases/IDataProvider.ts";
import { DenoKVDataProvider } from "../../src/databases/providers/DenoKVDataProvider.ts";

type User = {
  DisplayName: string;

  Email: string;
};

class TestDB extends Database {
  public Users = this.loadRecords(["Users"]);

  protected loadRecords<T>(keyRoot: string | string[]):
    | (DatabaseRecords<T> & DatabaseRecorder<T>)
    | undefined {
    keyRoot = typeof keyRoot === "string" ? [keyRoot] : keyRoot;

    const records = new DatabaseRecords<T>(
      keyRoot,
      this.dataProviderFactory<T>(),
    ) & DatabaseRecorder<T>();

    records;

    return records;
  }

  constructor(protected dataProviderFactory: <T>() => IDataProvider<T>) {
    super();
  }
}

export const MyDataProvider = new DenoKVDataProvider(await Deno.openKv());

const DB = new TestDB(MyDataProvider);

const user: User = DB.Users.Set({
  Email: "useremail@domain.com",
  DisplayName: "The User",
} as User);

const users = DB.Users(user.Email).Get();
