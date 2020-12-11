const { loadInput } = require('../util');

const input = loadInput(__dirname)
  .map(v => parseInt(v, 10));

input.sort((a, b) => a - b);

const differences = [0, 0, 0, 0];

for (let i = 1; i < input.length; i++) {
  const diff = input[i] - input[i - 1];

  differences[diff]++;
}

differences[input[0]]++;
differences[3]++;

console.log(differences);
console.log('result');
console.log(differences[1] * differences[3]);
