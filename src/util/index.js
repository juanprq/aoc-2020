const fs = require('fs');
const path = require('path');


const loadInputString = (dirPath) => {
  const result = fs.readFileSync(path.join(dirPath, '/input.txt'), 'utf8');

  if (result.charCodeAt(result.length - 1) === 10) {
    return result.slice(0, result.length - 1);
  } else {
    return result;
  }
}

const loadInput = (dirPath) => {
  const result = loadInputString(dirPath);
  return result.split('\n').filter(a => a.length > 0);
};


module.exports = { loadInput, loadInputString };
