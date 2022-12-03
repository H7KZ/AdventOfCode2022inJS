const { readFileSync } = require("fs");

const input = readFileSync("./input.txt", "utf8");

const lines = input.split("\n").map((line) => line.split(" "));

const wins = {
    a: "y",
    b: "z",
    c: "x",
};

const draws = {
    a: "x",
    b: "y",
    c: "z",
};

let score = 0;

lines.forEach((chars) => {
    chars[0] || chars[1] ? compare(chars[0], chars[1]) : null;
});

console.log(score);

function compare(a, b) {
    const first = String(a).toLowerCase();
    const second = String(b).toLowerCase();

    if (draws[first] == second) score += 3;

    if (wins[first] == second) score += 6;

    if (second == "x") score += 1;
    if (second == "y") score += 2;
    if (second == "z") score += 3;
}
