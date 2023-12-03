const textInput = await Deno.readTextFile("./2023/d2/input2.txt");

const games = textInput.split("\n").filter(g => g.length);

let res = 0;

for (let i = 0; i < games.length; i++) {
  console.log('gameid: ', i);

  const combos = {
    red: 0,
    blue: 0,
    green: 0
  };


  // get the sets
  console.log(games);
  const sets = games[i].split(":")[1].split(";");
  for (let j = 0; j < sets.length; j++) {
    const set = sets[j].split(",");
    console.log(set);
    set.forEach((c) => {
      const tt = c.trim().split(" ");
      console.log(tt);
      const value = tt[0];
      const color = tt[1];
      const currVal = Math.max(combos[color], Number(value));
      combos[color] = currVal;
    });
  }

  console.log('game processed', combos);
  const comboMultiple = Object.values(combos).reduce((acc, val) => {
    return acc * val;
  }, 1);

  console.log(comboMultiple);

  res = comboMultiple + res;
}

console.log(res);
