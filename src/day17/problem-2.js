const utils = require('../util');

const input = utils.loadInput(__dirname)
  .map(row => row.split(''));

const cycles = 6;
const size = input.length + cycles * 2;
const offset = Math.floor(size / 2);

const initialMatrix = utils.initialize4DMatrix(size, size, size, size, '.');

let combinations = [];
const buildCombinations = (accum = []) => {
  if (accum.length === 4) {
    combinations.push(accum);
    return;
  }

  [-1, 0, 1].forEach((idx) => buildCombinations([...accum, idx]));
}
buildCombinations();
combinations = combinations.filter(([a, b, c, d]) => !(a === 0 && b === 0 && c === 0 && d === 0));

const putWithOffset = (matrix, value, w, z, y, x, offset) => {
  matrix[w + offset][z + offset][y + offset][x + offset] = value;
}

// copy initial state
let localOffset = Math.floor(input.length / 2);
for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input.length; j++) {
    putWithOffset(initialMatrix, input[i][j], localOffset, localOffset, i, j, offset - localOffset);
  }
}

const countValue = (w, z, y, x, matrix) => {
  if (w < 0 || z < 0 || y < 0 || x < 0) return 0;
  if (w >= size || z >= size || y >= size || x >= size) return 0;

  if (matrix[w][z][y][x] === '#') return 1;
  return 0;
}

const countAdjacents = (w, z, y, x, matrix) => {
  return combinations
    .map(([dW, dZ, dY, dX]) => {
      return countValue(w + dW, z + dZ, y + dY, x + dX, matrix);
    })
    .reduce((a, b) => a + b);
}

const activate = (matrix) => {
  const newMatrix = utils.initialize4DMatrix(size, size, size, size, '.');

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      for (let k = 0; k < size; k++) {
        for (let l = 0; l < size; l++) {
          const count = countAdjacents(i, j, k, l, matrix);
          const value = matrix[i][j][k][l];
          if (value === '#') {
            if (count === 2 || count === 3) {
              newMatrix[i][j][k][l] = '#';
            } else {
              newMatrix[i][j][k][l] = '.';
            }
          } else {
            if (count === 3) {
              newMatrix[i][j][k][l] = '#';
            } else {
              newMatrix[i][j][k][l] = '.';
            }
          }
        }
      }
    }
  }

  return newMatrix;
};

let result = initialMatrix;
for (let cycle = 0; cycle < cycles; cycle++) {
  result = activate(result);
}

let resultCount = 0;
for (let i = 0; i < size; i++) {
  for (let j = 0; j < size; j++) {
    for (let k = 0; k < size; k++) {
      for (let l = 0; l < size; l++) {
        if (result[i][j][k][l] === '#') {
          resultCount++;
        }
      }
    }
  }
}

console.log('result should be 848', resultCount);
