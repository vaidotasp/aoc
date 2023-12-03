const textInput = await Deno.readTextFile("./2023/d3/input.txt");

const lines = textInput.split("\n");

//make sure we got a grid, same dimensions
const height = lines.length;
const width = lines.every(l => l.length === height);
let size = [0, 0];
if (width) {
	size = [10,10];
}
console.log('size', size);



//traversal
for (let i=0; i<lines.length; i++) {
	const row = lines[i].split("");
	console.log('row: ', i);
	for (let j=0; j<row.length; j++) {
		console.log(`col:${j} val:${row[j]}`);
	}
}

// console.log(lines);
