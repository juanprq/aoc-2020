const { loadInputString } = require('../util');

// byr (Birth Year) - four digits; at least 1920 and at most 2002.
// iyr (Issue Year) - four digits; at least 2010 and at most 2020.
// eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
// hgt (Height) - a number followed by either cm or in:
  // If cm, the number must be at least 150 and at most 193.
  // If in, the number must be at least 59 and at most 76.
// hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
// ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
// pid (Passport ID) - a nine-digit number, including leading zeroes.

const eyeColors = [
  'amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth',
];

const neededKeys = {
  byr: (value) => {
    const parsedValue = parseInt(value, 10);
    return parsedValue >= 1920 && parsedValue <= 2002;
  },
  iyr: (value) => {
    const parsedValue = parseInt(value, 10);
    return parsedValue >= 2010 && parsedValue <= 2020;
  },
  eyr: (value) => {
    const parsedValue = parseInt(value, 10);
    return parsedValue >= 2020 && parsedValue <= 2030;
  },
  hgt: (value) => {
    const number = parseInt(value.slice(0, value.length - 2), 10);
    const unit = value.slice(value.length - 2);

    if (unit === 'in') {
      return number >= 59 && number <= 76;
    } else if (unit === 'cm') {
      return number >= 150 && number <= 193;
    } else {
      return false;
    }
  },
  hcl: (value) => {
    return value.match(/^#[0-9a-f]{6}$/);
  },
  ecl: (value) => {
    return eyeColors.includes(value);
  },
  pid: (value) => {
    return value.match(/^\d{9}$/);
  },
};

const validateData = ([key, value]) => {
  if (!neededKeys[key]) return true;
  return neededKeys[key](value);
}

const validatePassport = (passport) => {
  const entries = Object.entries(passport);
  const keys = Object.keys(passport);

  return Object.keys(neededKeys)
    .every(key => keys.includes(key))
    &&
    entries
    .every(validateData);
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
  .map(validatePassport)
  .filter(a => a);

console.log('result -->');
console.log(input.length);
