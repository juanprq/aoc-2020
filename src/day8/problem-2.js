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

const executeProgram = (instructions) => {
  let accumulator = 0;
  let currentPosition = 0;
  const visited = [];

  while (visited[currentPosition] === undefined && currentPosition < instructions.length) {
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

  return [!visited[currentPosition], accumulator];
}

const results = [];
for (let i = 0; i < instructions.length; i++) {
  const prevInstruction = instructions[i];
  const { instruction } = prevInstruction;
  let newInstruction;

  if (instruction === 'acc') continue;
  if (instruction === 'jmp'){
    newInstruction = { ...prevInstruction, instruction: 'nop' };
  } else {
    newInstruction = { ...prevInstruction, instruction: 'jmp' };
  }

  instructions[i] = newInstruction;
  results.push(executeProgram(instructions));
  instructions[i] = prevInstruction;
}

console.log('Result ->');
console.log(results.filter(([correct]) => correct));
