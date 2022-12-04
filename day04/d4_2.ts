const textInput = await Deno.readTextFile("./input1.txt");

//sanitization of inputs
const rucks = textInput
	.split("\n")
	.filter((r) => r.length)
	.map((rucksack) => {
		const firstHalf = rucksack.slice(0, rucksack.length / 2);
		const secondHalf = rucksack.slice(rucksack.length / 2, rucksack.length);
		return [firstHalf, secondHalf];
	});
