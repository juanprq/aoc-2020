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

const validTickets = nearby.filter(ticket => ticket.every(isValid));

// I want to collect tickets by fields
const byFields = validTickets.reduce((accum, ticket) => {
  ticket.forEach((field, idx) => {
    if (!accum[idx]) {
      accum[idx] = [];
    }

    accum[idx].push(field);
  });

  return accum;
}, new Array(mine.length - 1));

const applyRule = (values, { rules: currentRules }) => {
  return values.every(v => {
    return currentRules.some(({ lower, upper }) => {
      if (lower <= v && upper >= v) return true;
      return false;
    });
  });
}

const getRulesThatApply = (values) => {
  return rules.filter((rule) => {
    return applyRule(values, rule);
  });
}

let rulesThatApplyByField = byFields.map(values => {
  const rulesThatApply = getRulesThatApply(values);

  return rulesThatApply;
});

const isComplete = rules => {
  return rules
    .map((r) => r.length)
    .every(count => count === 1);
};

const usedRules = {};

while(!isComplete(rulesThatApplyByField)) {
  rulesThatApplyByField = rulesThatApplyByField.map(rules => {
    if (rules.length === 1) {
      const [rule] = rules;
      usedRules[rule.field] = true;

      return rules;
    } else {
      return rules.filter(({ field }) => {
        return !usedRules[field];
      });
    }
  });
}

// now i have the result in rulesThatApplyByField
const result = rulesThatApplyByField.reduce((accum, [rule], idx) => {
  if (rule.field.startsWith('departure')) {
    return accum * mine[idx];
  }

  return accum;
}, 1);

console.log('result ->', result);
