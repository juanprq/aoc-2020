const { loadInput } = require('../util');

const [rulesRaw, [, mineRaw], [, ...nearbyRaw]] = loadInput(__dirname, '\n\n')
  .map(section => section.split('\n'));

const mine = mineRaw.split(',').map(v => parseInt(v, 10));
const nearby = nearbyRaw.map(ticket => ticket.split(',').map(v => parseInt(v, 10)));

const parseRules = (textRule) => {
  const regex = /^([\w\s]+):\s(\d+)-(\d+)\sor\s(\d+)-(\d+)$/

  const match = regex.exec(textRule);
  const [, field, ...rules] = match;
  const [lowerA, upperA, lowerB, upperB]  = rules.map(v => parseInt(v, 10));

  return {
    field,
    rules: [
      { lower: lowerA, upper: upperA },
      { lower: lowerB, upper: upperB },
    ],
  };
};

const rules = rulesRaw.map(parseRules);
const allRules = rules.map(r => r.rules).reduce((accum, v) => [...accum, ...v]);

const isValid = (value) => {
  const result = allRules.some(({ lower, upper }) => {
    if (value >= lower && value <= upper) return true;
    return false;
  });

  return result;
}

// unify all the nearby tickets
const result = nearby.reduce((accum, value) => {
  return [...accum, ...value];
})
  .filter((v) => !isValid(v))
  .reduce((a, b) => a + b, 0);

console.log('result should be 71', result);
