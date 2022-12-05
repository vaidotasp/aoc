const textInput = await Deno.readTextFile("./input1.txt");

//sanitization of inputs
const input = textInput.split("\n");
console.log(input);

const crates = input.slice(0, input.indexOf("") - 1);
const instructions = input.slice(input.indexOf("") + 1);
const stackWidthInstruction = input[input.indexOf("") - 1];

//how many elements can each row hold (number of columns in the container)
const stackWidth = Number(stackWidthInstruction.split(" ").sort().reverse()[0]);

const crateMap = new Map();

const tempRows = [];
crates.forEach((stack, i) => {
	// three consecutive empty strings means empty slot, single slots following the 3 can be ignored, but we dont get three empty slots if the end of the row is a crate, it just ends. We need to know if it truly is the end or we need to pad it. The way to know that is to check which index on the building row we are and compare it to the width of the stack.

	const row = [];

	const splitStack = stack.split(" ");
	console.log(splitStack);
	for (let i = 0; i < splitStack.length; i++) {
		if (
			splitStack[i] === "" &&
			splitStack[i + 1] === "" &&
			splitStack[i + 2] === ""
		) {
			row.push("");
			i = i + 3;
		} else {
			//remove brackets and leave the letter only "[D]"" -> "D"
			const letter = splitStack[i].replace(/[\[\]]/g, "");
			row.push(letter);
		}
	}

	// pad the end of the row with empty slots if that's necessary
	if (stackWidth > row.length) {
		row.push("");
	}
	console.log(row);
	tempRows.push(row);
});

console.log(tempRows);

for (let i = 0; i < stackWidth; i++) {
	const flipRow = [];
	tempRows.forEach((t) => {
		flipRow.push(t[i]);
	});
	crateMap.set(
		i,
		flipRow.reverse().filter((c) => c !== "")
	);
	// console.log("flipRow", flipRow.reverse());
}

console.log(crateMap);

function removeTheCrate(level: number, originalRow: string[], index: number) {
	originalRow[index] = "";
	crateMap.set(level, originalRow);
}

instructions.forEach((instruction) => {
	console.log("dealing with instruction: ", instruction);
	const cratesToMove = Number(instruction.split(" ")[1]);
	const from = Number(instruction.split(" ")[3]) - 1;
	const to = Number(instruction.split(" ")[5]) - 1;
	console.log(cratesToMove, from, to);

	for (let i = 0; i < cratesToMove; i++) {
		//removing

		const colToMove = crateMap.get(from);
		const itemToMove = colToMove.pop();
		crateMap.set(from, colToMove);
		//adding
		const colToAdd = crateMap.get(to);
		colToAdd.push(itemToMove);
		crateMap.set(to, colToAdd);
	}
});

console.log("done with instructions...");
console.log(crateMap);

let toplvls = "";

for (const [_, stack] of crateMap) {
	console.log(stack);
	const el = stack.pop();
	console.log(el);
	toplvls = toplvls.concat(el);
}
console.log(toplvls);
