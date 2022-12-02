const textInput = await Deno.readTextFile("./input1.txt");

const shapeScores: any = {
  rock: 1,
  paper: 2,
  scissors: 3,
};

const outcomeScores = {
  lost: 0,
  draw: 3,
  win: 6,
};

//encoding of shapes
const firstCol: any = {
  A: "rock",
  B: "paper",
  C: "scissors",
};

const secondCol: any = {
  X: "rock",
  Y: "paper",
  Z: "scissors",
};

const winCombos = {
  // rock: scissors,
  // scissors: paper,
  // paper: rock,
}

//sanitization of inputs
const rounds = textInput
  .split("\n")
  .filter((r) => r !== "")
  .map((combo) => {
    return combo
      .trim()
      .split(" ")
      .filter((c) => c !== " ")
      .join("");
  });

let totalScore = 0;

for (let i = 0; i < rounds.length; i++) {
  const roundCombo = rounds[i];
  const fC = roundCombo[0];
  const sC = roundCombo[1];
  console.log(fC, sC);

  if (firstCol[fC] === secondCol[sC]) {
    console.log("draw");
    totalScore += outcomeScores.draw;
    // win conditions
  } else if (firstCol[fC] === "rock" && secondCol[sC] === "scissors") {
    console.log("loss");
  } else if (firstCol[fC] === "scissors" && secondCol[sC] === "paper") {
    console.log("loss");
  } else if (firstCol[fC] === "paper" && secondCol[sC] === "rock") {
    console.log("loss");
  } else {
    //win conditions
    console.log("win");
    totalScore += outcomeScores.win;
  }

  //round score for hand
  console.log(shapeScores[secondCol[sC]]);
  totalScore += shapeScores[secondCol[sC]];
}

console.log("totalScore", totalScore);
console.log("totalScore should be", 15);
console.log(totalScore === 15);

// console.log(roundsArr);
