const { readFileSync } = require("fs");

const input = readFileSync("./input.txt", "utf8");

const lines = input.split("\r\n").map(line => line === "noop" ? line : line.split(" "));

let cycle = 0;
let cpu = 1;
let total = 0;

lines.forEach(line => {
    cycle++;

    if (checkCycle(cycle)) {
        total += cycle * cpu;
    }

    if (line === "noop") {
        return;
    }

    cycle++;

    if (checkCycle(cycle)) {
        total += cycle * cpu;
    }

    cpu += parseInt(line[1]);
});

console.log("Total: " + total);

function checkCycle(c) {
    for (let i = 20; i <= lines.length * 2; i+=40) {
        if (c === i) {
            return true;
        }
    }

    return false;
}