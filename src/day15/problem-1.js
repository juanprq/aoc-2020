const { loadInput } = require('../util');

const input = loadInput(__dirname)[0]
  .split(',')
  .map(v => parseInt(v, 10));

const memo = input.slice(0, input.length - 1).reduce((accum, number, idx) => {
  accum[number] = idx + 1;
  return accum;
}, {});

let lastNumber = input[input.length -1];
for (let i = input.length; i < 30000000; i++) {
  if (memo[lastNumber]) {
    const newNumber = i - memo[lastNumber];
    memo[lastNumber] = i;
    lastNumber = newNumber;
  } else {
    memo[lastNumber] = i;
    lastNumber = 0;
  }
}

const result = lastNumber;
console.log('result should be 436', result);

