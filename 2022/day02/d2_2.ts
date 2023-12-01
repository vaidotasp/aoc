const textInput = await Deno.readTextFile("./input2.txt");

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

//second column is how the rounds has to end
const secondCol: Record<string, string> = {
  X: "lose",
  Y: "draw",
  Z: "win",
};

const winCombos: Record<Shapes, Shapes> = {
  rock: "scissors",
  scissors: "paper",
  paper: "rock",
};

//inverse winCombos
const loseCombos: Record<Shapes, Shapes> = {
  scissors: "rock",
  paper: "scissors",
  rock: "paper",
};

let totalScore = 0;

for (let i = 0; i < rounds.length; i++) {
  const roundCombo = rounds[i];
  const opp = firstCol[roundCombo[0]];
  const con = secondCol[roundCombo[1]];
  console.log(opp, con);

  if (con === "draw") {
    //play same hand as opp
    totalScore += outcomeScores.draw;
    totalScore += shapeScores[opp];
  } else if (con === "win") {
    //we need to win
    totalScore += shapeScores[loseCombos[opp]];
    totalScore += outcomeScores.win;
  } else if (con === "lose") {
    //we need to lose
    totalScore += shapeScores[winCombos[opp]];
  }
}

console.log("totalScore -->", totalScore);
console.log("totalScore should be -->", 12);
console.log(totalScore === 12);
