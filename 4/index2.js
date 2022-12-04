const { readFileSync } = require("fs");

const input = readFileSync("./input.txt", "utf8");

const lines = input.split("\n").map((line) => line.split(","));

let total = 0;

lines.forEach((line) => {
    const [first, second] = line.map((x) => x.split("-").map(Number));

    if (Math.max(first?.[0], second?.[0]) <= Math.min(first?.[1], second?.[1])) {
        total++;
    }
});

console.log(total);
