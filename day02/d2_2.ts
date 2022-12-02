const textInput = await Deno.readTextFile("./input2.txt");
console.log("init");
console.log("reading input...");
console.log("-------------------");
// console.log(textInput);

//split in rounds
//

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

//second column is how the rounds has to end!
const secondCol: any = {
  X: "lose",
  Y: "draw",
  Z: "win",
};

function findPlay(opponent: string, condition: string) {
  //get condition
  const con = secondCol[condition];
  const opp = firstCol[opponent];

  return { con, opp };
}

const roundsArr = textInput.split("\n").filter((r) => r !== "");

let totalScore = 0;

for (let i = 0; i < roundsArr.length; i++) {
  const roundCombo = roundsArr[i].split("").filter((r) => r !== " ");
  const fC = roundCombo[0];
  const sC = roundCombo[1];
  console.log(fC, sC);

  const { con, opp } = findPlay(fC, sC);

  console.log(con, opp);
  if (con === "draw") {
    //play same hand as opp
    totalScore += outcomeScores.draw;
    totalScore += shapeScores[opp];
  } else if (con === "win") {
    //what is my hand to win this thing
    if (opp === "rock") {
      //wind against rock
      totalScore += shapeScores.paper;
    }
    if (opp === "paper") {
      //wind against rock
      totalScore += shapeScores.scissors;
    }
    if (opp === "scissors") {
      //wind against rock
      totalScore += shapeScores.rock;
    }
    totalScore += outcomeScores.win;
  } else if (con === "lose") {
    //what is losing condition
    if (opp === "rock") {
      //wind against rock
      totalScore += shapeScores.scissors;
    }
    if (opp === "paper") {
      //wind against rock
      totalScore += shapeScores.rock;
    }
    if (opp === "scissors") {
      //wind against rock
      totalScore += shapeScores.paper;
    }

  }

  //if (firstCol[fC] === 'rock' && secondCol[sC] === 'rock') {
  //  // console.log('draw');
  //  totalScore += outcomeScores.draw;
  //} else if (firstCol[fC] === 'paper' && secondCol[sC] === 'paper'){
  //  // console.log('draw');
  //  totalScore += outcomeScores.draw;
  //} else if (firstCol[fC] === 'scissors' && secondCol[sC] === 'scissors'){
  //  // console.log('draw');
  //  totalScore += outcomeScores.draw;
  //// win conditions
  //} else if (firstCol[fC] === 'rock' && secondCol[sC] === 'scissors'){
  //  // console.log('loss');
  //} else if (firstCol[fC] === 'scissors' && secondCol[sC] === 'paper'){
  //  // console.log('loss');
  //} else if (firstCol[fC] === 'paper' && secondCol[sC] === 'rock'){
  //  // console.log('loss');
  //} else {
  ////win conditions
  //  // console.log('win');
  //  totalScore += outcomeScores.win;
  //}

  //round score for hand
  // console.log(shapeScores[secondCol[sC]]);
  // totalScore += shapeScores[secondCol[sC]];

  //determine winning condition
  //ok I got rock, what does rock win against
}

console.log("totalScore", totalScore);

// console.log(roundsArr);
