const textInput = await Deno.readTextFile("./2023/d1/input.txt");

const lines = textInput.split("\n");


const numberWords = {
	one: '1',
	two: '2',
	three: '3',
	four: '4',
	five: '5',
	six: '6',
	seven: '7',
	eight: '8',
	nine: '9',
};

const digs = []
for (const line of lines) {
  const firstDigitText = line.match(/(\d|one|two|three|four|five|six|seven|eight|nine)/);
  const lastDigitText = line.match(/.*(\d|one|two|three|four|five|six|seven|eight|nine).*/);
  // console.log('lastDigitText', lastDigitText?.[1])
  if (firstDigitText?.[0] && lastDigitText?.[1]) {
    const dig1 = numberWords[firstDigitText?.[0]] || firstDigitText?.[0]
    const dig2 = numberWords[lastDigitText?.[1]] || lastDigitText?.[1]
    // console.log('yo', dig1,dig2)
    digs.push([dig1, dig2]);
  }
}

const res = digs.reduce((acc, val) => {
  const num = Number(`${val[0]}${val[1]}`);

	acc = acc + num;
	return acc;
}, 0);

console.log('calib', res);
