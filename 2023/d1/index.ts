const textInput = await Deno.readTextFile("./2023/d1/input2.txt");

const lines = textInput.split("\n");

// console.log(lines)

const calibrationValues = [];

for (const line of lines) {
	console.log(line);
	const lineWithNoLetters = line.split("").filter(c => Number(c));
	if (lineWithNoLetters.length === 1) {
		calibrationValues.push([lineWithNoLetters[0], lineWithNoLetters[0]])
	}else {
		calibrationValues.push([lineWithNoLetters[0], lineWithNoLetters[lineWithNoLetters.length -1]])
	}
	console.log(lineWithNoLetters)
}

console.log(calibrationValues)
console.log(calibrationValues.reduce((acc, val) => {
	const num = Number(`${val[0]}${val[1]}`);

	const sum = Number(val[0]) + Number(val[1]);
	acc = acc + num;
	return acc
}, 0))



// console.log(textInput);
