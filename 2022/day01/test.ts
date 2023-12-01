import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { main } from "./index.ts";

Deno.test("Day 01 Test", async () => {
 const textInputTest = await Deno.readTextFile("./input_text_test.txt");

  const processedString = main(textInputTest);

  const largest = 24000;
  const threeLargest = 45000;

  assertEquals(processedString[0], largest);
  assertEquals(processedString[1], threeLargest);
});
