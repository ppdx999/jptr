import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { toJsonPointer } from "./jptr.ts";

Deno.test("toJsonPointer", () => {
  const obj = {
    a: 1,
    b: {
      c: 2,
    },
    d: {
      e: [{ a: 3 }, { b: 4 }, { c: 5 }],
    },
    nullValue: null,
    undefinedValue: undefined,
  };
  const ptrs = toJsonPointer(obj);

  assertEquals(ptrs, [
    "/a",
    "/b/c",
    "/d/e/0/a",
    "/d/e/1/b",
    "/d/e/2/c",
    "/nullValue",
    "/undefinedValue",
  ]);
});
