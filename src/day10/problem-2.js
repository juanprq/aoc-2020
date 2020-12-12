const { loadInput } = require('../util');

const input = loadInput(__dirname)
  .map(v => parseInt(v, 10));

input.sort((a, b) => a - b);
input.push(input[input.length - 1] + 3);

// initialize with one possibilitie at position 0
const memo = [1];
for (let i = 0; i < input.length; i++) {
  currentValue = input[i];
  memo[currentValue] = (memo[currentValue - 3] || 0)
    + (memo[currentValue - 2] || 0)
    + (memo[currentValue - 1] || 0);
}

console.log('result -->');
// for the example should be 19208
console.log(memo);
console.log('it should be 19208', memo[input[input.length - 1]]);
