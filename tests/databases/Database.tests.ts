import { TsConfigResolver } from "https://deno.land/x/ts_morph@18.0.0/common/ts_morph_common.js";
import { DatabaseRecords } from "../../src/databases/DatabaseRecords.ts";
import {
  Database,
  DatabaseRecordsFactoryFull,
} from "../../src/databases/Database.ts";
import { IDataProvider } from "../../src/databases/IDataProvider.ts";
import { DenoKVDataProvider } from "../../src/databases/providers/DenoKVDataProvider.ts";
import { assertEquals, randomUUID } from "../test.deps.ts";

Deno.test("Databases Basic Testing", async (t) => {
  type User = {
    DisplayName: string;

    Email: string;
  };

  class TestDB extends Database {
    public Users = this.loadRecordsFactory<
      DatabaseRecordsFactoryFull<User>,
      User
    >("Users");

    constructor(protected dataProviderFactory: <T>() => IDataProvider<T>) {
      super(dataProviderFactory);
    }
  }

  const kv = await Deno.openKv();

  const prvdrFactory = <T>() => new DenoKVDataProvider<T>(kv);

  const DB = new TestDB(prvdrFactory);

  const userId = randomUUID.generate() as string;

  const userId2 = randomUUID.generate() as string;

  await t.step("Users Set", async () => {
    await DB.Users(userId).Set({
      Email: "useremail@domain.com",
      DisplayName: "The User",
    } as User);

    await DB.Users(userId2).Set({
      Email: "useremail2@domain.com",
      DisplayName: "The User2",
    } as User);
  });

  await t.step("Users Get", async () => {
    const user = await DB.Users(userId).Get();

    assertEquals(user?.Email, "useremail@domain.com");
    assertEquals(user?.DisplayName, "The User");
  });

  //   await t.step("Users List/Delete", async () => {
  //     const users = await DB.Users.List!();

  //     assertEquals(users?.length, 2);
  //   });

  const users = await DB.Users.List!();

  for await (const user of users) {
    const { key, value } = user;

    let u = await DB.Users(key).Get();

    assertEquals(u?.Email, "useremail@domain.com");

    await DB.Users(key).Delete();

    u = await DB.Users(key).Get();

    assertEquals(u, null);
  }

  kv.close();
});