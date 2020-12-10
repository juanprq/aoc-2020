const { loadInput } = require('../util');

const parseInput = (groupString) => {
  const persons = groupString.split('\n');

  return persons.map(person => person.split(''));
};

const countGroup = (persons) => {
  const set = persons
    .reduce((accum, value) => {
      return [...accum, ...value];
    }, [])
    .reduce((accum, value) => {
      accum.add(value);
      return accum
    }, new Set());

  return set.size;
};

const result = loadInput(__dirname, '\n\n')
  .map(parseInput)
  .map(countGroup)
  .reduce((accum, value) => accum + value);

console.log('result ->');
console.log(result);
