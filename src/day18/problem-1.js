const { loadInput } = require('../util');

const operators = ['*', '+'];

const isOperator = (char) => {
  return operators.includes(char);
};

const isNumber = (char) => {
  return char.match(/\d+/);
};

const resolve = (tokens) => {
  let currentTokens = tokens;
  const stack = [];

  while(currentTokens.length || stack.length === 3) {
    if (stack.length === 3) {
      const { value: b } = stack.pop();
      const operator = stack.pop();
      const { value: a } = stack.pop();

      let result;
      if (operator.value === '*') {
        result = a * b;
      } else {
        result = a + b;
      }

      stack.push({ value: result, type: 'number' });
    } else {
      const [head, ...rest] = currentTokens;

      if (head.type === 'open') {
        let openParenthesis = 0;
        let currentIdx = 0;
        while (!(rest[currentIdx].type === 'close' && openParenthesis === 0)) {
          if (rest[currentIdx].type === 'open') {
            openParenthesis++;
          } else if (rest[currentIdx].type === 'close') {
            openParenthesis--;
          }

          currentIdx++;
        }

        const result = resolve(rest.slice(0, currentIdx));
        stack.push({ value: result, type: 'number' });
        currentTokens = rest.slice(currentIdx + 1);
      } else {

        stack.push(head);
        currentTokens = rest;
      }
    }
  }

  return stack.pop().value;
}

const parseExpression = (stringExpression) => {
  let tokens = [];
  let accum = '';
  for (let i = 0; i < stringExpression.length; i++) {
    const currentChar = stringExpression.charAt(i);
    const peek = stringExpression.charAt(i + 1);
    accum += currentChar;

    if (isNumber(accum.trim()) && !isNumber(peek)) {
      tokens.push({ value: parseInt(accum.trim(), 10), type: 'number' });
      accum = '';
    }

    if (accum.trim() === '(' || accum.trim() === ')') {
      tokens.push({ value: accum.trim(), type: accum.trim() === '(' ? 'open' : 'close' });
      accum = '';
    }

    if (isOperator(accum.trim())) {
      tokens.push({ value: accum.trim(), type: 'operator' });
      accum = '';
    }
  }

  return resolve(tokens);
};


const input = loadInput(__dirname)
  .map(parseExpression)
  .reduce((a, b) => a + b);

console.log(input);
