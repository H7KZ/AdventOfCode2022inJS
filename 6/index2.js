const { readFileSync } = require("fs");

const input = readFileSync("./input.txt", "utf8");

let lastFourChars = input.substring(0, 14).split("");

for (let i = 14; i < input.length; i++) {
    if ([...new Set(lastFourChars)].length === 14) {
        console.log(i);
        break;
    }

    lastFourChars.shift();
    lastFourChars.push(input[i]);
}