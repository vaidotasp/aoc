const textInput = await Deno.readTextFile("./input1.txt");

type Shapes = "rock" | "paper" | "scissors";

const shapeScores: Record<Shapes, number> = {
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
const firstCol: Record<string, Shapes> = {
  A: "rock",
  B: "paper",
  C: "scissors",
};

const secondCol: Record<string, Shapes> = {
  X: "rock",
  Y: "paper",
  Z: "scissors",
};

const winCombos: Record<Shapes, Shapes> = {
  rock: "scissors",
  scissors: "paper",
  paper: "rock",
};

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
  const opp = firstCol[roundCombo[0]];
  const me = secondCol[roundCombo[1]];

  if (opp === me) {
    totalScore += outcomeScores.draw;
    // check if opponent wins first, else we win
  } else if (winCombos[opp] === me) {
    console.log("loss");
  } else {
    console.log("win");
    totalScore += outcomeScores.win;
  }

  //add score for hand
  totalScore += shapeScores[me];
}

console.log("totalScore -->", totalScore);
console.log("totalScore should be -->", 15);
console.log(totalScore === 15);
