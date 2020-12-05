const { loadInput } = require('../util');

const parseInput = (string) => {
  const data = string.split(/[\s:-]/);

  return {
    min: parseInt(data[0], 10),
    max: parseInt(data[1], 10),
    char: data[2],
    string: data[4],
  };
};

const isValid = ({ min, max, char, string }) => {
  const count = string
    .split('')
    .reduce((accum, currentChar) => {
      if (currentChar === char) return accum + 1;
      return accum;
    }, 0)

  return count >= min && count <= max;
};

const input = loadInput(__dirname)

const result = input
  .map(parseInput)
  .map(isValid)
  .filter(a => a);

console.log('--> result');
console.log(result.length);
