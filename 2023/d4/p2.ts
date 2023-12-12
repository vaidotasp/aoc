const textInput = await Deno.readTextFile("./2023/d4/input.txt");
console.log("------------ PROGRAM BEGIN ----------");
const lines = textInput.split("\n");

// we are interested in how many instances of each card we are left with at the very end
type Card = {
	instances: number;
	winningNumbers: number;
	name: number;
};
const cardMap = new Map<number, Card>();

lines.forEach((line) => {
	const cardName = Number(line.split(":")[0].slice(5));

	const [win, hand] = line.split(":")[1].split("|");
	const winArr = win
		.split(" ")
		.filter((c) => c !== "")
		.map((c) => c.trim());
	const handArr = hand
		.split(" ")
		.filter((c) => c !== "")
		.map((c) => c.trim());

	//winning numbers
	const winningNumbers = handArr.reduce((acc, val) => {
		if (winArr.includes(val)) {
			return (acc += 1);
		}
		return acc;
	}, 0);

	cardMap.set(cardName, {
		winningNumbers: winningNumbers,
		instances: 1,
		name: cardName,
	});
});

for (let i = 1; i <= cardMap.size; i++) {
	const card = cardMap.get(i)!;
	//for each card's winning number we go over and update the subsequent cards
	for (let k = 0; k < card.instances; k++) {
		for (let j = 0; j < card.winningNumbers && j <= cardMap.size; j++) {
			const cardToUpdate = cardMap.get(i + j + 1);
			if (cardToUpdate) {
				cardToUpdate.instances += 1;
			}
		}
	}
}

const res = Array.from(cardMap.values()).reduce((acc, val) => {
	return acc + val.instances;
}, 0);

console.log(res);
