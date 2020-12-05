const fs = require('fs');
const path = require('path');

const loadInput = (dirPath) => {
  const result = fs.readFileSync(path.join(dirPath, '/input.txt'), 'utf8');
  return result.split('\n').filter(a => a.length > 0);
};

module.exports = { loadInput };
