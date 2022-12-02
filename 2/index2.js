const { readFileSync } = require('fs');

const input = readFileSync('./input.txt', 'utf8');

const lines = input.split('\n');

let score = 0;

lines.forEach((line) => {
    compare(line.split(' ')[0], line.split(' ')[1]);
});

console.log(score);

function compare(A, B) {
    let choice1 = String(A).toLowerCase();
    let choice2 = String(B).toLowerCase();

    if (choice1 == 'a') {
        if (choice2 == 'y') {
            score += 4;
            return;

        } else if (choice2 == 'x') {
            score += 3;
            return;
        } else {
            score += 8;
            return;
        }
    }
    else if (choice1 == 'b') {
        if (choice2 == 'z') {
            score += 9;
            return;
        } else if (choice2 == 'y') {
            score += 5;
            return;
        } else {
            score += 1;
            return;
        }
    }
    else if (choice1 == 'c') {
        if (choice2 == 'x') {
            score += 2;
            return;
        } else if (choice2 == 'z') {
            score += 7;
            return;
        } else {
            score += 6;
            return;
        }
    }
}