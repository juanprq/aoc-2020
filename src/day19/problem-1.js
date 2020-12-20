const { loadInput } = require('../util');

const [rawRules, rawInput] = loadInput(__dirname, '\n\n');

const parseRule = (rawRule) => {
  const [idx, tail] = rawRule.split(': ');
  let rules;
  if (tail.match(/[a-z]/)) {
    rules = tail.replace(/"/g, '');
  } else {
    rules = tail
      .split(' | ')
      .map((subRule) => subRule.split(' '));
  }

  return {
    idx,
    rules,
  };
};

const rules = rawRules
  .split('\n')
  .map(parseRule)
  .reduce((accum, { idx, rules }) => {
    return { ...accum, [idx]: rules };
  }, {});

const input = rawInput.split('\n');

const generateRegexp = (rule = '0') => {
  const currentRule = rules[rule];
  if (typeof currentRule === 'string') {
    return currentRule;
  } else {
    const regex = currentRule
      .map(subRule => subRule
        .map(generateRegexp).join('')
      ).join('|');

    return `(${regex})`;
  }
};
const regexp = new RegExp(`^${generateRegexp()}$`);
const result = input
  .map(v => regexp.test(v))
  .filter(v => v);

console.log('result =>', result.length);
