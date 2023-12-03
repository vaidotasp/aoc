const textInput = await Deno.readTextFile("./2023/d2/input.txt");

const games = textInput.split("\n");

const RED_MAX = 12;
const GREEN_MAX = 13;
const BLUE_MAX = 14;

const limitMap = {
  red: RED_MAX,
  green: GREEN_MAX,
  blue: BLUE_MAX,
};

const possible_games = {};

for (let i = 0; i < games.length; i++) {
  possible_games[`${i + 1}`] = 1;
  // get the sets
  const sets = games[i].split(":")[1].split(";");
  for (let j = 0; j < sets.length; j++) {
    const set = sets[j].split(",");
    set.forEach((c) => {
      let tt = c.trim().split(" ");
      console.log(tt);
      // const tt = c.split("");
      // console.log(tt);
      const value = tt[0];
      const color = tt[1];
      // console.log(color);
      // console.log(limitMap[color]);
      // // console.log(value, color);
      if (limitMap[color] < value) {
        //   console.log("limit");
        possible_games[`${i + 1}`] = 0;
      }
    });
  }
}

let sum = 0;

const processed = Object.entries(possible_games).forEach(([id, bool]) => {
  if (bool) {
    sum = sum + Number(id);
  }
});

console.log(processed);

console.log(sum);
