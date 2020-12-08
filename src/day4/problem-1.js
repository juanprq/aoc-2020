const { loadInputString } = require('../util');

const neededKeys = [
 'byr',
 'iyr',
 'eyr',
 'hgt',
 'hcl',
 'ecl',
 'pid',
 // 'cid',
];

const validateKeys = (passport) => {
  const keys = Object.keys(passport);
  return neededKeys.every(key => keys.includes(key));
};

const parsePasswport = (passportArray) => {
  return passportArray.reduce((accum, row) => {
    const [key, value] = row.split(':');

    return { ...accum, [key]: value };
  }, {});
};

const input = loadInputString(__dirname)
  .split('\n\n')
  .map(row => row.split(/[\n\s]/))
  .map(parsePasswport)
  .map(validateKeys)
  .filter(a => a);

console.log('result -->');
console.log(input.length);
