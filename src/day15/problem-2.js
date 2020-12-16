const { loadInput } = require('../util');

const input = loadInput(__dirname)[0]
  .split(',')
  .map(v => parseInt(v, 10));

const memo = input.slice(0, input.length - 1).reduce((accum, number, idx) => {
  accum[number] = idx + 1;
  return accum;
}, new Array(30e6));

let start = new Date();
let lastNumber = input[input.length -1];
for (let i = input.length; i < 30e6; i++) {
  if (memo[lastNumber]) {
    const newNumber = i - memo[lastNumber];
    memo[lastNumber] = i;
    lastNumber = newNumber;
  } else {
    memo[lastNumber] = i;
    lastNumber = 0;
  }

  if (i % 1e6 === 0) {
    const end = new Date() - start
    console.log({ i });
    console.info('Execution time: %dms', end)
    start = new Date();
  }
}

const result = lastNumber;
console.log('result should be 436', result);
