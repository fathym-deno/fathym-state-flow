import { assert, describe } from "../../test.deps.ts";
import { assertEquals } from "$std/testing/asserts.ts";
import { DenoKVDataProvider } from "../../../src/databases/providers/DenoKVDataProvider.ts";

describe("DenoKVDataProvider Tests", () => {
  describe("Set and Get Test", () => {
    const kv = new Map();
    const provider = new DenoKVDataProvider(kv);

    const key = ["testKey"];
    const value = { test: "value" };

    provider.Set(key, value);

    const result = provider.Get(key);

    assertEquals(result, value);
    assert(result !== null);
  });

  describe("Delete Test", () => {
    const kv = new Map();
    const provider = new DenoKVDataProvider(kv);

    const key = ["testKey"];
    const value = { test: "value" };

    provider.Set(key, value);
    provider.Delete(key);

    const result = provider.Get(key);

    assertEquals(result, null);
  });
});