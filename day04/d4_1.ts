const textInput = await Deno.readTextFile("./input1.txt");
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

let overlap = 0;

for (let i = 0; i < sectionPairs.length; i++) {
	const elfPair = sectionPairs[i];
	const firstElf = sectionPairs[i][0];
	const secondElf = sectionPairs[i][1];

	console.log("process", elfPair);
	//find the largest range instruction

	if (firstElf.length > secondElf.length) {
		//chances are first elf can overlap the second
		// we are looking for all elements in the smaller array existing in the bigger one!
		const tt = secondElf.every((e) => firstElf.includes(e));
		console.log(tt);
		if (tt) {
			overlap += 1;
		}
	} else if (firstElf.length < secondElf.length) {
		// second range could overlap the first
		const tt = firstElf.every((e) => secondElf.includes(e));
		console.log(tt);
		if (tt) {
			overlap += 1;
		}
	} else {
		// do we even check same range? 2-3 and 2-3 for example?
		const tt = firstElf.every((e) => secondElf.includes(e));
		console.log(tt);
		if (tt) {
			overlap += 1;
		}
	}
}

console.log(overlap);
