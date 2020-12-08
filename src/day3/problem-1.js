const { loadInput } = require('../util');

const input = loadInput(__dirname)
  .map(row => row.split(''));

const rows = input.length;
const cols = input[0].length;

console.log({ rows, cols });

const countTrees = (i, j) => {
  const x = j % cols;

  const char = input[i][x];
  const countTree = char === '#' ? 1 : 0;

  console.log({ i, j, char });

  if (i === rows - 1) return countTree;

  return countTree + countTrees(i + 1, j + 3);
};

const result = countTrees(0, 0);

console.log('result -->');
console.log(result);
