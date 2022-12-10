const { readFileSync } = require("fs");

const input = readFileSync("./input.txt", "utf8");

const lines = input.split("\r\n").map(line => line === "noop" ? line : line.split(" "));

let cycle = -1;
let cpu = 1;
let layer = 0;
let ctr = [
    [],
    [],
    [],
    [],
    [],
    []
];

lines.forEach(line => {
    if (line === "noop") {
        cycle++;

        if (cycle % 40 === 0 && cycle !== 0) {
            cycle = 0;
            layer++;
        }

        if (cycle >= cpu - 1 && cycle <= cpu + 1) {
            ctr[layer].push("#");
        } else {
            ctr[layer].push(".");
        }

        return;
    } else {
        cycle++;

        if (cycle % 40 === 0 && cycle !== 0) {
            cycle = 0;
            layer++;
        }

        if (cycle >= cpu - 1 && cycle <= cpu + 1) {
            ctr[layer].push("#");
        } else {
            ctr[layer].push(".");
        }

        cycle++;

        if (cycle % 40 === 0 && cycle !== 0) {
            cycle = 0;
            layer++;
        }

        if (cycle >= cpu - 1 && cycle <= cpu + 1) {
            ctr[layer].push("#");
        } else {
            ctr[layer].push(".");
        }

        

        cpu += Number(line[1]);
    }
});

ctr.forEach(layer => console.log(layer.join('')));