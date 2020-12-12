const { loadInput } = require('../util');

const input = loadInput(__dirname)
    .map(row => row.split(''));

const pp = (m) => {
    for (let i = 0; i < m.length; i++) {
        for (let j = 0; j < m[0].length; j++) {
           process.stdout.write(m[i][j]);
        }

        console.log();
    }
};

const copy = (m) => {
    const newM = [];
    for (let i = 0; i < m.length; i++) {
        newM[i] = [...m[i]];
    }

    return newM;
}

const isOccupied = (m, i, j) => {
    if (!m[i]) return 0;
    return m[i][j] === '#' ? 1 : 0;
};

const countSeats = (m, i, j) => {
    return isOccupied(m, i - 1, j - 1)
        + isOccupied(m, i - 1, j)
        + isOccupied(m, i - 1, j + 1)
        + isOccupied(m, i, j - 1)
        + isOccupied(m, i, j + 1)
        + isOccupied(m, i + 1, j - 1)
        + isOccupied(m, i + 1, j)
        + isOccupied(m, i + 1, j + 1);
};

const iterate = (m) => {
    const newM = copy(m);
    let changed = false;

    for (let i = 0; i < m.length; i++) {
        for (let j = 0; j < m[0].length; j++)  {
            if (m[i][j] === '.') continue;
            const occupied = m[i][j] === '#';
            const count = countSeats(m, i, j);

            if (occupied && count >= 4) {
                changed = true;
                newM[i][j] = 'L';
            } else if (!occupied && count === 0) {
                changed = true;
                newM[i][j] = '#';
            }
        }
    }

    return [changed, newM];
}

let changed;
let m = input;

do {
    [changed, m] = iterate(m);
    console.log({ changed });
} while(changed);

let count = 0
for (let i = 0; i < m.length; i++) {
    for (let j = 0; j < m[0].length; j++) {
        if (m[i][j] === '#') count++;
    }
}

console.log('result ->');
console.log('it should be 37', count);
