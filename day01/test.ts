import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { main } from "./index.ts";

Deno.test("Day 01 Test", () => {
  const input = "abc";
  const output = main(input);

  const case1 = "abc";
  assertEquals(output, case1, `\nExpected: ${case1}\nReturned: ${output}`);
});
