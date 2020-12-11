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

const countBags = (targetBag) => {
  const rule = rules.find(({ origin }) => origin === targetBag);

  console.log(targetBag);

  if (rule.target.length === 0) return 1;
  return 1 + rule
    .target
    .map(({ quantity, bag }) => quantity * countBags(bag))
    .reduce((a, b) => a + b);
}

const response = countBags(targetBag);

console.log('response ->');
console.log(response - 1);
