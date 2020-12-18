const { loadInput } = require('../util');
const [, inputIds] = loadInput(__dirname);

const ids = inputIds
  .split(',')
  .map((v, i) => {
    if (v === 'x') return undefined;

    const newValue = parseInt(v, 10);
    return { value: newValue, index: i };
  })
  .filter(a => a);

const isValid = (target) => {
  return ids
    .every(({ value, index }) => {
      return (target + index) % value === 0;
    });
};

let response;
let counter = 0;
let offset;

let iter = 0;

// como puedo hacer para que no itere de uno en uno ?
// quienes son los que menos se repiten? yo creo que los dos mas grandes
const a = ids[3];
const b = ids[7];

console.log(ids);

let start = new Date();
while (true) {
  const current = counter * a.value - a.index;

  if ((current + b.index) % b.value === 0) {
    if (!offset) offset = counter;

    if (isValid(current)) {
      response = current;
      break;
    }
  }

  if (offset) {
    counter += b.value;
  } else {
    counter++;
  }

  iter++;
  if (iter % 1e9 === 0) {
    const time = new Date() - start;
    start = new Date();
    console.log({ iter, time, current });
  }
};

console.log(iter);

console.log('it should be 1202161486', response);
