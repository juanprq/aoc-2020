const { loadInput } = require('../util');

const parseInput = (groupString) => {
  const persons = groupString.split('\n');

  return persons.map(person => person.split(''));
};

const countGroup = (persons) => {
  const inter = persons.reduce((a, b) => a.filter(c => b.includes(c)));
  return inter.length;
};

const result = loadInput(__dirname, '\n\n')
  .map(parseInput)
  .map(countGroup)
  .reduce((accum, value) => accum + value);

console.log('result ->');
console.log(result);
