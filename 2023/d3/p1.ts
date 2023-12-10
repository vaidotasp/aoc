const textInput = await Deno.readTextFile("./2023/d3/input.txt");
console.log("------------ PROGRAM BEGIN ----------");
const lines = textInput.split("\n");

//make sure we got a grid, same dimensions
const height = lines.length;
const width = lines.every((l) => l.length === height);
let size = [0, 0]; // this defines a boundary of elements, we should have 10x10
if (width) {
	size = [10, 10];
}

// console.log("size", size);
//let digits = [[val, row, colRange]]
//let symbols = [[val, row, colRange]]

type Element = [string, number, number[]];
type SymbolElement = [string, number, number];

const digits: Element[] = [];
const symbols: SymbolElement[] = [];

type Coords = [number, number[]];
type Numbers = Record<number, Coords>;
// Keep the hash table where value is a number that is found
const numberMap = new Map();

/*
	how would the map look like?
	453: r:1, c:[3,4,5],
	35: r:3, c:[1]
*/

// each row can have numbers, can be a single number, can be a large (multiple digit) number

//helpers
const isNumber = (c: string) => {
	if (Number.isNaN(Number(c))) {
		return false;
	}
	return true;
};

const isSymbol = (c: string) => {
	if (!isNumber(c) && c !== ".") {
		return true;
	}
	return false;
};

//traversal and parsing
for (let row = 0; row < lines.length; row++) {
	const rowData = lines[row].split("");
	for (let col = 0; col < rowData.length; col++) {
		let numCoords: Coords = [row, []];

		const val = rowData[col];
		const valIsNumber = isNumber(val);
		console.log(`traversing row: ${row}, col: ${col}, val: ${val}`);
		const numStr = [];
		const numCoord = [];
		if (valIsNumber) {
			//add from index, to index
			numCoord.push(col);
			// extract number value, but need to check how "long" is the number
			for (let i = col; i < rowData.length; i++) {
				const subVal = rowData[i];
				// accounting for number that is last in the row
				if (isNumber(subVal) && i === rowData.length - 1) {
					numStr.push(subVal);
					numCoord.push(i);
					col = i;
					break;
				}
				if (isNumber(subVal)) {
					numStr.push(subVal);
					continue;
				}
				if (subVal !== ".") {
					const entry = [subVal, row, i];
					symbols.push(entry);
				}
				numCoord.push(i - 1);
				col = i;
				break;
			}
			numCoords[1] = numCoord;
			numberMap.set(numStr.join(""), numCoords);
			const entry = [numStr.join(""), row, numCoord];
			digits.push(entry);
		} else {
			if (val !== ".") {
				const entry = [val, row, col];
				symbols.push(entry);
			}
		}
	}
}

// Analysis

console.log(digits);
console.log(symbols);

// General idea is to go over numbers and check if they have adjacent (diagonally too) symbol

function checkAdjacent(row: number, cols: number[]) {
	console.log(cols);
	//first isolate the rows, we need row that is target and +1 -1 row (given the size constraint)
	let adj = false;
	const symbol = symbols.filter((s) => {
		//same row level
		return (
			(s[1] === row || s[1] === row + 1 || s[1] === row - 1) && s[0] === "*"
		);
	});

	console.log("filtered", symbol);

	if (symbol.length) {
		adj = symbol.some((s) => {
			//only going over symbols in adjacent rows
			//should be some
			const symbolRow = s[1];
			const symbolCol = s[2];
			console.log("s:", s[0], symbolRow, symbolCol);
			console.log("num target", row, cols);
			if (symbolRow === row) {
				console.log("row-same", s[0]);
				if (cols[0] - 1 === symbolCol || cols[1] + 1 === symbolCol) {
					return true;
				}
				//check immediate left and immediate right
				//same row
			} else if (symbolRow < row) {
				console.log("row-above", s[0]);
				if (
					cols[0] - 1 === symbolCol ||
					cols[1] + 1 === symbolCol ||
					(symbolCol <= cols[1] && symbolCol >= cols[0])
				) {
					return true;
				}
			} else if (symbolRow > row) {
				//row below
				console.log("row-below", s[0]);
				if (
					cols[0] - 1 === symbolCol ||
					cols[1] + 1 === symbolCol ||
					(symbolCol <= cols[1] && symbolCol >= cols[0])
				) {
					return true;
				}
			}

			return false;
		});
	}
	return adj;
}
/*
const adjNums = [];
for (const number of digits) {
	const [value, row, cols] = number;
	console.log("check num", value, row, cols);
	const adj = checkAdjacent(row, cols);
	if (adj) {
		adjNums.push(number);
	}
	// console.log("adj for it", adj);
}

console.log("adj:", adjNums);
console.log(
	"SUM",
	adjNums.reduce((acc, val) => {
		const v = Number(val[0]);
		return acc + v;
	}, 0)
);
*/

const starSymbols = symbols.filter((s) => s[0] === "*");
let gearRatios = 0;
for (const symbol of starSymbols) {
	console.log("s", symbol);
	const matched: string[] = [];
	//get numbers from current row, row above and row below
	const adjNumberInRows = digits.filter((d) => {
		if (
			d[1] === symbol[1] ||
			d[1] + 1 === symbol[1] ||
			d[1] - 1 === symbol[1]
		) {
			return true;
		}
	});

	adjNumberInRows.forEach((d) => {
		const symbolRow = symbol[1];
		const row = d[1];
		const cols = d[2];
		const symbolCol = symbol[2];
		if (d[1] === symbol[1]) {
			//same row
			if (d[2][0] - 1 === symbol[2] || d[2][1] + 1 === symbol[2]) {
				matched.push(d[0]);
			}
		} else if (symbolRow < row) {
			//row above
			if (
				cols[0] - 1 === symbolCol ||
				cols[1] + 1 === symbolCol ||
				(symbolCol <= cols[1] && symbolCol >= cols[0])
			) {
				matched.push(d[0]);
			}
		} else if (symbolRow > row) {
			//row below
			if (
				cols[0] - 1 === symbolCol ||
				cols[1] + 1 === symbolCol ||
				(symbolCol <= cols[1] && symbolCol >= cols[0])
			) {
				matched.push(d[0]);
			}
		}
	});
	// console.log(adjNumberInRows);
	// console.log("matched for symbol", symbol, matched);
	if (matched.length === 2) {
		//gear found
		console.log("gear found");
		console.log(matched);
		const mult = matched.reduce((acc, val) => {
			const val1 = Number(val);
			return acc * val1;
		}, 1);
		console.log(mult);
		gearRatios += mult;
	} else {
		console.log("gear not found");
		console.log(matched);
	}
}
console.log(gearRatios);

// so we go over star symbols and check if they are adjecent to exactly two numbers, if so we extract those numbers

console.log("-----------PROGRAM END-------------");

/*

given the target of [1, 1], surrounding is [10][12], [00][01][02], [20][21][22]


[for multi digit numbers we need to know from to columns only and of course the full number]
given the target of [1, 1,2], surrounding is [10][13], [00][01][02], [20][21][22]


// what data structure do we need here, one that holds the value and its coordinates, values can duplicate, coors include row and cols (range)


let digits = [[val, row, colRange]]
let symbols = [[val, row, colRange]]
*/
