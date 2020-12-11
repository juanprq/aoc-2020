const { loadInput } = require('../util');

const parseInput = (row) => {
  const [instruction, sQty] = row.split(' ');

  return {
    instruction,
    quantity: parseInt(sQty, 10),
  };
};

const instructions = loadInput(__dirname)
  .map(parseInput);

let accumulator = 0;
let currentPosition = 0;
const visited = [];

while (visited[currentPosition] === undefined) {
  visited[currentPosition] = true;
  const { instruction, quantity } = instructions[currentPosition];

  if (instruction === 'nop') {
    currentPosition++;
  } else if (instruction === 'acc') {
    currentPosition++
    accumulator += quantity;
  } else {
    currentPosition += quantity;
  }
}

console.log('Result ->');
console.log(accumulator);
