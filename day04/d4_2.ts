const textInput = await Deno.readTextFile("./input2.txt");

// range fn helper
const range = (start: number, stop: number, step: number) =>
	Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

//sanitization of inputs
const sections = textInput.split("\n").filter((r) => r.length);
const sectionPairs = sections.map((s) =>
	s
		.split(",")
		.map((s) => {
			return s.split("-").map((s) => Number(s));
		})
		.map((s) => {
			const ranged = range(s[0], s[1], 1);
			return ranged;
		})
);

let overlapCounter = 0;

// check for at least one element existing in the arr
function checkForSymmetry(arr1: number[], arr2: number[]) {
	return arr1.some((e) => arr2.includes(e));
}

for (let i = 0; i < sectionPairs.length; i++) {
	const firstElf = sectionPairs[i][0];
	const secondElf = sectionPairs[i][1];
	if (firstElf.length > secondElf.length) {
		//chances are first elf can overlap the second
		// we are looking for all elements in the smaller array existing in the bigger one!
		const overlapExist = checkForSymmetry(secondElf, firstElf);
		overlapCounter += Number(overlapExist);
	} else if (firstElf.length < secondElf.length) {
		// second range could overlap the first
		const overlapExist = checkForSymmetry(firstElf, secondElf);
		overlapCounter += Number(overlapExist);
	} else {
		// checking same length arrays, this could be cleaned up
		const overlapExist = checkForSymmetry(secondElf, firstElf);
		overlapCounter += Number(overlapExist);
	}
}

console.log("overlap pairs should be ---> 4");
console.log("overlap pairs is -       -->", overlapCounter);
console.log(overlapCounter === 4);
