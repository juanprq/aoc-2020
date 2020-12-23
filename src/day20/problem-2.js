// el primer problema que encuentro es que tengo que orientar las imagenes de manera correcta
// una vez orientadas de manera correcta, remuevo los bordes y uno todo en una matriz
// hago una mascara (aun no se bien como... serian como offsets?)
// y empiezo a deslizar la mascara, si todas las posiciones son === '#' las cambio a puntos
// me tiene que dar alguna conicidencia, porque si no, esta mal orientada y la tengo que rotar.
// cuanto encuentre conicidencias y deslice la mascara por toda la imagen, debo contar los #
// ahi encuentro la respuesta;
//
//el problema mas duro sin duda, es la armada de la imagen

const { loadInput, print2DMatrix, initialize2DMatrix, rotateNLeft } = require('../util');

const getBorders = (image) => {
  const borders = [
    [], [], [], [],
  ];
  const size = image.length;

  for (let i = 0; i < size; i++) {
    borders[0].push(image[0][i]);
    borders[1].push(image[i][size - 1]);
    borders[2].push(image[size - 1][i]);
    borders[3].push(image[i][0]);
  }


  return borders;
}

const parseInput = (row) => {
  const [rawTitle, ...rawImage] = row.split('\n');
  const image = rawImage.map(v => v.split(''));

  const id = parseInt(rawTitle.match(/\d+/)[0], 10);
  const borders = getBorders(image);

  return { id, image, borders, reference: new Set() };
};

const input = loadInput(__dirname, '\n\n')
  .map(parseInput);

for (let i = 0; i < input.length; i++) {
  const matrixA = input[i];
  const { id: idA, borders: bordersA } = matrixA;

  for (let j = i + 1; j < input.length; j++) {
    const matrixB = input[j];
    const { id: idB, borders: bordersB } = matrixB;

    for (let k = 0; k < bordersA.length; k++) {
      for (let l = 0; l < bordersB.length; l++) {

        if (JSON.stringify(bordersA[k]) === JSON.stringify(bordersB[l]) || JSON.stringify(bordersA[k].reverse()) === JSON.stringify(bordersB[l])) {
          matrixA.reference.add({ id: idB, local: k, target: l });
          matrixB.reference.add({ id: idA, local: l, target: k });
        }
      }
    }

  }
}

const result = input
  .filter(m => m.reference.size === 2)
  .map(({ id }) => id)
  .reduce((a, b) => a * b);

console.log('result should be 20899048083289', result);

const memo = input.reduce((accum, matrix) => ({ ...accum, [matrix.id]: matrix }), {});
const size = Math.sqrt(input.length);
const resultImage = initialize2DMatrix(size, size, null);

// choose the left upper corner
const leftUpperCorner = input.find(matrix => matrix.reference.size === 2);

const borders = [...leftUpperCorner.reference];
const minor = borders.reduce((accum, border) => {
  if (border.local < accum) return border.local;
  return accum;
}, Infinity);

const getNRotations = (origin, target) => {
  const result = origin - target;
  return result < 0 ? 4 + result : result;
}

// implementing the traverse function
const traverse = (i, j, current, previous) => {
  if (i < 0 || i >= size) return;
  if (j < 0 || j >= size) return;
  if (resultImage[i][j]) return;

  let rotations;
  if (i === 0 && j === 0) {
    rotations = getNRotations(minor, 1);
  } else {
    // reference: local, target, so because it is the previous, the rotation should be from the target, to the local
    rotations = getNRotations(previous.target, previous.local);
  }

  // calculate the new borders index
  current.reference = [...current.reference].map(reference => ({ ...reference, local: getNRotations(reference.local, rotations) }));
  current.image = rotateNLeft(current.image, rotations);
  resultImage[i][j] = current.image;

  console.log({ id: current.id, i, j, reference: current.reference });

  // navigate to the references
  const nextLeft = current.reference.find(({ local }) => local === 1);
  const nextDown = current.reference.find(({ local }) => local === 2);

  if (nextLeft) traverse(i, j + 1, memo[nextLeft.id], nextLeft);
  if (nextDown) traverse(i + 1, j, memo[nextDown.id], nextDown);
}

traverse(0, 0, leftUpperCorner);
