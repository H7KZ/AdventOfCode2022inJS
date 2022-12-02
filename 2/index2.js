const { readFileSync } = require('fs');

const input = readFileSync('./input.txt', 'utf8');

const lines = input.split('\n').map(line => line.split(' '));

const wins = {
    a: 'y',
    b: 'z',
    c: 'x'
}

const draws = {
    a: 'x',
    b: 'y',
    c: 'z'
}

const loses = {
    a: 'z',
    b: 'x',
    c: 'y'
}

const translate = {
    x: loses,
    y: draws,
    z: wins
}

let score = 0;

lines.forEach((chars) => {
    chars[0] || chars[1] ? compare(chars[0], chars[1]) : null;
});

console.log(score);

function compare(a, b) {
    const first = String(a).toLowerCase();
    const second = String(b).toLowerCase();
    const ditto = translate?.[second]?.[first];

    if (draws[first] == ditto) score += 3;

    if (wins[first] == ditto) score += 6;

    if (ditto == 'x') score += 1;
    if (ditto == 'y') score += 2;
    if (ditto == 'z') score += 3;
}