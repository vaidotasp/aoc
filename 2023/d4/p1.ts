const textInput = await Deno.readTextFile("./2023/d4/input.txt");
console.log("------------ PROGRAM BEGIN ----------");
const lines = textInput.split("\n");

const points = [];
for (const line of lines) {
	const cardNumbers = line
		.split(":")
		.slice(1)
		.map((l) => l.split("|"))[0];

	const winningNumbers = cardNumbers[0].split(" ").filter((s) => s !== "");
	const handNumbers = cardNumbers[1].split(" ").filter((s) => s !== "");
	// console.log("win", winningNumbers);
	// console.log("hand", handNumbers);

	//how many numbers in hand I have that are winning numbers

	const myWinningNumbers = handNumbers.filter((n) =>
		winningNumbers.includes(n)
	);
	console.log("w", myWinningNumbers);

	if (myWinningNumbers.length === 1) {
		points.push(1);
	}
	if (myWinningNumbers.length > 1) {
		console.log("go");
		let pt = 1;
		for (let i = 0; i < myWinningNumbers.length; i++) {
			console.log("hi loop");
			pt = pt * 2;
		}
		points.push(pt / 2);
	}
}
console.log(
	"winning",
	points.reduce((acc, val) => {
		return acc + val;
	}, 0)
);
