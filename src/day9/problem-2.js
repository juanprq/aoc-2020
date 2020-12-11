const { loadInput } = require('../util');

const input = loadInput(__dirname)
  .map(v => parseInt(v, 10));

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

let invalidIndex;

for (let i = offset; i < input.length; i++) {
  if (!isValid(i)) {
    invalidIndex = i;
  }
}

console.log('invalid index ->');
console.log({ invalidIndex, value: input[invalidIndex] });

const findWeakness = (invalidIndex) => {
  const target = input[invalidIndex];

  for (let i = 0; i < invalidIndex - 2; i++) {
    let accum = 0;
    for (let j = i; j < invalidIndex - 1; j++) {
      accum += input[j];

      if (accum > target) break;
      if (accum === target) {
        console.log({ target, accum, i, j });

        const slice = input.slice(i, j + 1);
        return Math.min(...slice) + Math.max(...slice);
      }
    }
  }
}

const solution = findWeakness(invalidIndex);

console.log({ solution });
