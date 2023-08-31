// import { assertEquals } from "$std/testing/asserts.ts";
// import { PostgresDataProvider } from "../../../src/databases/providers/PostgresDataProvider.ts";

// Deno.test("Postgres Data Provider Tests", async (t) => {
//   const provider = new PostgresDataProvider("postgres://user:password@127.0.0.1:5432/deploy?sslmode=disable");

//   const keyRoot = "testKey";

//   const key = [keyRoot, "hello"];
//   const value = { test: "world" };

//   const key1 = [keyRoot, "hi"];
//   const value1 = { test: "people" };

//   await t.step("Create First", async () => {
//     await provider.Set(key, value);

//     const result = await provider.Get(key);

//     assertEquals(result.test, value.test);
//   });

//   await t.step("Create Second", async () => {
//     await provider.Set(key1, value1);

//     const result = await provider.Get(key1);

//     assertEquals(result.test, value1.test);
//   });

//   await t.step("List Check", async () => {
//     const results = await provider.List([keyRoot]);

//     assertEquals(results.length, 2);

//     assertEquals(results[1].test, value1.test);
//   });

//   await t.step("Update Check", async () => {
//     const newValue = "world2";

//     await provider.Set(key, { test: newValue });

//     const result = await provider.Get(key);

//     assertEquals(result.test, newValue);
//   });

//   await t.step("Delete Check", async () => {
//     await provider.Delete(key);

//     const result = await provider.Get(key);

//     assertEquals(result, null);
//   });
// });
