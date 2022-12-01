function getXLargest(inputArr: number[], num: number) {
  return inputArr.slice(0, num).reduce((acc, val) => acc + val, 0);
}

export function main(input: string) {
  const cals = input.split("\n");

  const calsByElfs = [];
  let individualElfChunk = [];

  for (let i = 0; i < cals.length; i++) {
    const cal = Number(cals[i]);
    if (cal !== 0) {
      individualElfChunk.push(cal);
    } else {
      //temp sum the chunk
      const sumOfChunk = individualElfChunk.reduce((acc, val) => acc + val, 0);
      calsByElfs.push(sumOfChunk);
      individualElfChunk = [];
    }
  }

  // sort Desc arr of calories by largest first
  calsByElfs.sort((a, b) => b - a);

  const largest = getXLargest(calsByElfs, 1);
  const threeLargest = getXLargest(calsByElfs, 3);

  return [largest, threeLargest];
}

const textInput = await Deno.readTextFile("./input_text_test.txt");
const [largest, threeLargest] = main(textInput); 
