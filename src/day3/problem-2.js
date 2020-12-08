
const { loadInput } = require('../util');

const input = loadInput(__dirname)
  .map(row => row.split(''));

const rows = input.length;
const cols = input[0].length;

console.log({ rows, cols });

const countTrees = (i, j, slope) => {
  const x = j % cols;

  const char = input[i][x];
  const countTree = char === '#' ? 1 : 0;

  console.log({ i, j, char });

  if (i === rows - 1) return countTree;

  const [rowInc, colInc] = slope;
  return countTree + countTrees(i + rowInc, j + colInc, slope);
};

const result = [
  [1, 1],
  [1, 3],
  [1, 5],
  [1, 7],
  [2, 1],
]
  .map(slope => countTrees(0, 0, slope))
  .reduce((a, b) => a * b);

console.log('result -->');
console.log(result);
