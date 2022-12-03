const { readFileSync } = require("fs");

const input = readFileSync("./input.txt", "utf8");

const lines = input.split("\n");

const alphabet = Array.from(Array(26))
    .map((e, i) => i + 97)
    .map((x) => String.fromCharCode(x))
    .concat(
        Array.from(Array(26))
            .map((e, i) => i + 65)
            .map((x) => String.fromCharCode(x))
    );

let total = 0;

for (let i = 0; i < lines.length - 3; i += 3) {
    [
        ...new Set(
            lines[i]
                .split("")
                .filter((value) => lines[i + 1].includes(value))
                .filter((value) => lines[i + 2].includes(value))
        ),
    ].forEach((char) => (total += alphabet.indexOf(char) + 1));
}

console.log(total);
