const textInput = await Deno.readTextFile("./input2.txt");

//sanitization of inputs
//
//split in the chunks of 3
const inputArr = textInput.split("\n").filter((r) => r !== "");
// .map(rucksack => {
//   const firstHalf = rucksack.slice(0, rucksack.length /2);
//   const secondHalf = rucksack.slice(rucksack.length /2, rucksack.length);
// return [firstHalf, secondHalf];

// })
//
//
const rucksGroups = [];
for (let i = 0; i < inputArr.length; i += 3) {
  const chunk = inputArr.slice(i, i + 3);
  rucksGroups.push(chunk);
}

console.log(rucksGroups);

let priorityTotal = 0;

for (let i = 0; i < rucksGroups.length; i++) {
  // console.log('process', rucks[i]);
  //find all chars that appreas in both compartments
  const duplicates = new Set();

  const firstGroup = rucksGroups[i][0];
  const secondGroup = rucksGroups[i][1];
  const thirdGroup = rucksGroups[i][2];

  console.log(firstGroup, secondGroup, thirdGroup);

  Array.from(firstGroup).forEach((fc) => {
    Array.from(secondGroup).forEach((sc) => {
      Array.from(thirdGroup).forEach((tc) => {
        if (fc === sc && sc === tc) {
          duplicates.add(fc);
        }
      });
    });
  });

  const dupArr = Array.from(duplicates) as unknown as string[];
  console.log(dupArr);

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
      //lowecase
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

console.log("totalScore -->", priorityTotal);
// console.log("totalScore should be -->", 15);
// console.log(totalScore === 15);
