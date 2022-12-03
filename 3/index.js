const { readFileSync } = require("fs");

const input = readFileSync("./input.txt", "utf8");

const lines = input
    .split("\n")
    .map(
        (line) => line.slice(0, line.length / 2) + " " + line.slice(line.length / 2)
    )
    .map((line) => line.split(" "));

const alphabet = Array.from(Array(26))
    .map((e, i) => i + 97)
    .map((x) => String.fromCharCode(x))
    .concat(
        Array.from(Array(26))
            .map((e, i) => i + 65)
            .map((x) => String.fromCharCode(x))
    );

let total = 0;

lines.forEach((line) => {
    [
        ...new Set(line[0].split("").filter((value) => line[1].includes(value))),
    ].forEach((char) => (total += alphabet.indexOf(char) + 1));
});

console.log(total);
