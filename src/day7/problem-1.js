const { loadInput } = require('../util');

const parseRules = (row) => {
  const [, origin] = row.match(/(\w+\s\w+)\sbags/);
  const regexTarget =  /(\d+)\s(\w+\s\w+)\sbags?[\,\.]/g;

  const target = [];
  let match = regexTarget.exec(row);
  while (match !== null) {
    const [, quantity, bag] = match;
    target.push({
      quantity: parseInt(quantity, 10),
      bag,
    });

    match = regexTarget.exec(row);
  }

  return { origin, target };
};

const rules = loadInput(__dirname)
  .map(parseRules);

const targetBag = 'shiny gold';
const memo = {};

const findTargetBag = (currentRule, targetBag) => {
  // {
  //   origin: 'light red ',
  //   target: [
  //     { quantity: 1, bag: 'bright white' },
  //     { quantity: 2, bag: 'muted yellow' }
  //   ]
  // }
  if (memo[currentRule.origin]) return memo[currentRule.origin];
  const { target } = currentRule;

  if (target.length === 0) {
    memo[currentRule.origin] = false;
    return false;
  };
  const exists = target.find(({ bag }) => bag === targetBag);
  if (exists) {
    memo[currentRule.origin] = true;
    return true;
  }

  return target
    .map(({ bag }) => {
      const rule = rules.find(({ origin }) => origin === bag);
      return findTargetBag(rule, targetBag);
    })
    .some(a => a);
};

const response = rules
  .map(rule => findTargetBag(rule, targetBag))
  .filter(a => a);

console.log(memo);
console.log('response ->');
console.log(response.length);
