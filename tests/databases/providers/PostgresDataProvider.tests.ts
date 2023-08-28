import { assert, describe } from "../../test.deps.ts";
import { assertEquals } from "$std/testing/asserts.ts";
import { PostgresDataProvider } from "../../../src/databases/providers/PostgresDataProvider.ts";

describe("PostgresDataProvider Tests", () => {
  describe("Set and Get Test", () => {
    const provider = new PostgresDataProvider("postgres://user:password@127.0.0.1:5432/deploy?sslmode=disable");

    const key = ["testKey"];
    const value = { test: "value" };

    provider.Set(key, value);

    const result = provider.Get(key);

    assertEquals(result, value);
    assert(result !== null);
  });

  describe("Delete Test", () => {
    const provider = new PostgresDataProvider("postgres://user:password@127.0.0.1:5432/deploy?sslmode=disable");

    const key = ["testKey"];
    const value = { test: "value" };

    provider.Set(key, value);
    provider.Delete(key);

    const result = provider.Get(key);

    assertEquals(result, null);
  });
});