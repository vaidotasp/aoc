const textInput = await Deno.readTextFile("./input1.txt");

// range fn helper
const range = (start: number, stop: number, step: number) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

//sanitization of inputs
const sections = textInput.split("\n").filter((r) => r.length);

const sectionPairs = sections.map((s) =>
  s
    .split(",")
    .map((s) => {
      return s.split("-").map((s) => Number(s));
    })
    .map((s) => {
      const ranged = range(s[0], s[1], 1);
      return ranged;
    })
);

// check for all elements existing in the arr
function checkForSymmetry(arr1: number[], arr2: number[]) {
  return arr1.every((e) => arr2.includes(e));
}

let overlap = 0;

for (let i = 0; i < sectionPairs.length; i++) {
  const firstElf = sectionPairs[i][0];
  const secondElf = sectionPairs[i][1];

  //find the largest range instruction

  if (firstElf.length > secondElf.length) {
    //chances are first elf can overlap the second
    // we are looking for all elements in the smaller array existing in the bigger one!
    const overlapExist = checkForSymmetry(secondElf, firstElf);
    overlap += Number(overlapExist);
  } else if (firstElf.length < secondElf.length) {
    const overlapExist = checkForSymmetry(firstElf, secondElf);
    overlap += Number(overlapExist);
  } else {
    //likely redundant
    const overlapExist = checkForSymmetry(secondElf, firstElf);
    overlap += Number(overlapExist);
  }
}

console.log(overlap);
