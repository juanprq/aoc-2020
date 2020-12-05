const { loadInput } = require('../util');

const input = loadInput(__dirname)
  .map(v => parseInt(v, 10));

const numberIndexes = input.reduce((accum, key) => {
  accum[key] = true;
  return accum;
}, []);

let numbers;
for (let i = 0; i < input.length; i++) {
  const number = input[i];
  const complement = 2020 - input[i];

  if (numberIndexes[complement]) {
    numbers = [number, complement];
    break;
  }
}

console.log('--> result');
console.log(numbers);
console.log(numbers[0] * numbers[1]);
