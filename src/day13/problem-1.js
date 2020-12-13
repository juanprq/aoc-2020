const { loadInput } = require('../util');

const [depart, inputIds] = loadInput(__dirname);
const result = inputIds
  .split(',')
  .filter(v => v !== 'x')
  .map(v => parseInt(v, 10))
  .map(v => {
    return {
      id: v,
      value: Math.ceil(depart / v) * v,
    };
  })
  .reduce((accum, v) => {
    return v.value < accum.value ? v : accum;
  });

console.log('result ->');
console.log('it should be 295', (result.value - depart) * result.id)
