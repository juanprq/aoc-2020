const { loadInput } = require('../util');

const input = loadInput(__dirname)
  .map(v => parseInt(v, 10));

const numberIndexes = input.reduce((accum, key) => {
  accum[key] = true;
  return accum;
}, []);

const findSumOf = (n) => {
  let numbers;
  for (let i = 0; i < input.length; i++) {
    const number = input[i];
    const complement = n - input[i];

    if (numberIndexes[complement]) {
      numbers = [number, complement];
      break;
    }
  }

  return numbers;
};

let result;
for (let i = 0; i < input.length; i++) {
  const number1 = input[i];
  const complement = 2020 - number1;

  const numbers = findSumOf(complement);
  if (numbers) {
    result = [number1, ...numbers];
  }
}

console.log('--> result');
console.log(result);
console.log(result.reduce((a, b) => a + b));
console.log(result.reduce((a, b) => a * b));
