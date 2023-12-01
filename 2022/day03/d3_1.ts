const textInput = await Deno.readTextFile("./input1.txt");

//sanitization of inputs
const rucks = textInput
  .split("\n")
  .filter((r) => r.length)
  .map((rucksack) => {
    const firstHalf = rucksack.slice(0, rucksack.length / 2);
    const secondHalf = rucksack.slice(rucksack.length / 2, rucksack.length);
    return [firstHalf, secondHalf];
  });

// console.log(rucks);

let priorityTotal = 0;

function findCommonElementsAcrossArrays(list: string[][]): string[] {
  /*
 arrays are not necesarily even in length, not sorted, unclear how many, but it is always
  chars. We are looking the opposite of symetric difference here, something that repeats in each array only once?
  */

  const commonUniqueElements = new Set();

  //transform array of arrays into sets maybe?
  const listSet = list.map((l) => {
    console.log("processing..", l);
    const tt = l.map((arr) => new Set(arr));
    return tt;
  });
  console.log(listSet);
  // for (let i=0; i < list.length; i++) {
  //   const currArr = list[i];
  //   console.log('curr', currArr);

  // }
  // go over each array and find repeating elements across all arrays
  return [];
}

findCommonElementsAcrossArrays(rucks);

for (let i = 0; i < rucks.length; i++) {
  //find all chars that appreas in both compartments
  const duplicates = new Set();

  for (let j = 0; j < rucks[i][0].length; j++) {
    //inside first compartment
    const firstCompartmentItem = rucks[i][0][j];
    for (let k = 0; k < rucks[i][1].length; k++) {
      const secondCompartmentItem = rucks[i][1][k];
      if (firstCompartmentItem === secondCompartmentItem) {
        duplicates.add(firstCompartmentItem);
      }
    }
  }

  const dupArr = Array.from(duplicates) as string[];
  // console.log(dupArr);

  dupArr.forEach((char) => {
    if (char.toUpperCase() === char) {
      //capital
      //find position from the "A"
      const APos = "A".charCodeAt(0);
      const charPos = char.charCodeAt(0);
      if (APos === charPos) {
        priorityTotal += 27;
      }

      console.log(APos, charPos);
      priorityTotal += charPos - APos + 27;
    } else {
      //lowercase
      const APos = "a".charCodeAt(0);
      const charPos = char.charCodeAt(0);
      if (APos === charPos) {
        priorityTotal += 1;
      }
      priorityTotal += charPos - APos + 1;
    }
  });

  // Lowercase item types a through z have priorities 1 through 26.
  // console.log("a".charCodeAt(0)) // 97
  // console.log("z".charCodeAt(0)) // 122
  // console.log("A".charCodeAt(0)) // 65
  // console.log("Z".charCodeAt(0)) // 90
  // Uppercase item types A through Z have priorities 27 through 52.
}

console.log("totalScore           -->", priorityTotal);
console.log("totalScore should be -->", 157);
console.log(priorityTotal === 157);
