const { loadInput, print2DMatrix } = require('../util');

const parseInput = (row) => {
  const [rawTitle, ...rawImage] = row.split('\n');
  const image = rawImage.map(v => v.split(''));

  const id = parseInt(rawTitle.match(/\d+/)[0], 10);

  return { id, image };
};

const input = loadInput(__dirname, '\n\n')
  .map(parseInput);

input.forEach(({ id, image }) => {
  print2DMatrix(image);
});
