const { readFileSync } = require("fs");

const input = readFileSync("./input.txt", "utf8");

let lastFourChars = input.substring(0, 4).split("");

for (let i = 4; i < input.length; i++) {
    if ([...new Set(lastFourChars)].length === 4) {
        console.log(i);
        break;
    }

    lastFourChars.shift();
    lastFourChars.push(input[i]);
}
