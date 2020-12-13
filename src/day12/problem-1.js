const { loadInput } = require('../util');

const verticalMapping = {
  N: 1,
  S: -1,
};

const horizonalMapping = {
  E: 1,
  W: -1,
};

const parseInput = (row) => {
  const regexTarget =  /^([A-Z]{1})(\d+)$/g;

  let match = regexTarget.exec(row);
  const [, instruction, amount] = match;
  return {
    instruction,
    amount: parseInt(amount, 10),
  };
};

const input = loadInput(__dirname)
  .map(parseInput);

const rotate = (facing, instruction, amount) => {
  const directions = ['N', 'W', 'S', 'E'];

  const mod = instruction === 'L' ? 1 : -1;
  const currentIndex = directions.findIndex(d => d === facing);

  let newIndex = (currentIndex + amount / 90 * mod) % 4;
  if (newIndex < 0) {
    newIndex = directions.length + newIndex;
  }

  console.log({ facing, instruction, amount, newIndex, newDirection: directions[newIndex] });

  return directions[newIndex];
}

const result = input.reduce((accum, { instruction, amount }) => {
  const { facing } = accum;
  const direction = instruction === 'F' ? facing : instruction;

  let result
  if (verticalMapping[direction]) {
    result = { ...accum, north: accum.north + amount * verticalMapping[direction] };
  } else if (horizonalMapping[direction]) {
    result = { ...accum, east: accum.east + amount * horizonalMapping[direction] };
  } else {
    const newDirection = rotate(facing, instruction, amount);
    result = { ...accum, facing: newDirection };
  }

  // console.log(result);

  return result;
}, { east: 0, north: 0, facing: 'E' });

const calculateResult = ({ east, north }) => {
  return Math.abs(east) + Math.abs(north);
}

console.log('the result ->');
console.log('it should be 25', calculateResult(result));
