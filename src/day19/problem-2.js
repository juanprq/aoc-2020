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
  } else if (rule === '8') {
    const regexp42 = generateRegexp('42');
    return `${regexp42}+`;
  } else if (rule === '11') {
    const regexp42 = generateRegexp('42');
    const regexp31 = generateRegexp('31');

    const regexps = [];
    for (let i = 1; i <= 10; i++) {
      regexps.push(`((${regexp42}){${i}}(${regexp31}){${i}})`);
    }

    return `(${regexps.join('|')})`;
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
  .filter(v => regexp.test(v))

console.log('result =>', result.length);
