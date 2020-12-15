const { loadInput } = require('../util');

const input = loadInput(__dirname);

const parseMem = (row) => {
  const regex = /^mem\[(\d+)\]\s=\s(\d+)$/;
  const match = regex.exec(row);

  const [, idx, value] = match;

  return {
    idx: parseInt(idx, 10),
    value: parseInt(value, 10),
  };
};

const applyMask = (value, rawMask) => {
  let newValue = value
    .toString(2)
    .padStart(36, '0')
    .split('')
    .map((bit, idx) => {
      if (rawMask[idx] !== 'X') {
        return rawMask[idx];
      }

      return bit;
    })
    .join('');

  return parseInt(newValue, 2);
};

const currentMemory = {};
let currentMask;
for (let i = 0; i < input.length; i++) {
  const row = input[i];
  if (row.startsWith('mask')) {
    [,, maskStr] = row.split(' ');
    currentMask = maskStr.split('');
  } else {
    const { idx, value } = parseMem(row);
    const newValue = applyMask(value, currentMask);

    currentMemory[idx] = newValue;
  }
}

const result = Object.values(currentMemory).reduce((a, b) => a + b, 0);

console.log('result ->');
console.log('it should be 165:', result);
