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

const getSeat = (m, i, j) => {
    if (!m[i]) return undefined;
    return m[i][j];
};

const countSeats = (m, i, j) => {
    const count = (i, j, dI, dJ) => {
        const currentSeat = getSeat(m, i, j);
        if (currentSeat === undefined) return 0;
        if (currentSeat === '#') return 1;
        if (currentSeat === 'L') return 0;

        return count(i + dI, j + dJ, dI, dJ);
    }

    return count(i - 1, j - 1, -1, -1)
        + count(i - 1, j, - 1, 0)
        + count(i - 1, j + 1, -1, 1)

        + count(i, j - 1, 0, -1)
        + count(i, j + 1, 0, 1)

        + count(i + 1, j - 1, 1, -1)
        + count(i + 1, j, 1, 0)
        + count(i + 1, j + 1, 1, 1)
};

const iterate = (m) => {
    const newM = copy(m);
    let changed = false;

    for (let i = 0; i < m.length; i++) {
        for (let j = 0; j < m[0].length; j++)  {
            if (m[i][j] === '.') continue;
            const occupied = m[i][j] === '#';
            const count = countSeats(m, i, j);

            if (occupied && count >= 5) {
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
console.log('it should be 26', count);
