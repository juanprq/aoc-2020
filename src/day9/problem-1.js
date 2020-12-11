const { loadInput } = require('../util');

const input = loadInput(__dirname)
  .map(v => parseInt(v, 10));

// lets consider the example of length 5

let offset = 25;

const isValid = (current) => {
  const target = input[current];
  const memo = {};

  for (let i = current - offset; i < current; i++) {
    memo[input[i]] = true;
  }

  for (let i = current - offset; i < current; i++) {
    const a = input[i];
    const complement = target - a;

    if (memo[complement]) {
      return true;
    }
  }

  return false;
};

for (let i = offset; i < input.length; i++) {
  if (!isValid(i)) {
    console.log('invalid ->');
    console.log(input[i]);
  }
}
