const { readFileSync } = require("fs");

const input = readFileSync("./input.txt", "utf8");

const lines = input.split("\n\n").map(l => l.split("\n"));

const cratesInRow = [];

lines[0].every(line => {
    let row = [];
    if (line === lines[0][lines[0].length - 1]) return false;
    for (let i = 0; i < line.length; i += 4) {
        row.push(line.slice(i, i + 4).trim().replace("\[", "").replace("\]", ""));
    }

    cratesInRow.push(row);

    return true;
});

const crates = [];

for (let i = 0; i < cratesInRow[cratesInRow.length - 1].length; i++) {
    let column = [];
    for (let x = 0; x < cratesInRow.length; x++) {
        if (cratesInRow[x][i] == "") continue;
        column.push(cratesInRow[x][i]);
    }

    crates.push(column);
}

lines[1].map(l => l.split(" ")).forEach(l => {
    const instruct = l.filter((_, i) => i % 2 !== 0).map(Number);
    let cratesToMove = [];
    for (let i = 0; i <= instruct[0] - 1; i++) {
        cratesToMove.push(crates[instruct[1] - 1][i]);
    }

    cratesToMove.forEach(c => {
        crates[instruct[2] - 1].unshift(c);
    });
    crates[instruct[1] - 1]?.splice(0, instruct[0]);
});

let output = "";
crates.forEach(c => {
    output += c[0];
});

console.log(output);