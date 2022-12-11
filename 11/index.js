const { readFileSync } = require("fs");

const input = readFileSync("./input.txt", "utf8");

const lines = input.split("\r\n\r\n").map(l => l.split("\r\n").map(l => l.split("  ")));

let monkeys = [];

lines.forEach(monkey => {
    let newMonkey = {
        name: Number(monkey[0].toString().split(" ")[1].toString().split(":")[0]),
        items: monkey[1].toString().split(": ")[1].toString().split(", ").map(Number),
        operation: monkey[2].toString().split(": ")[1].toString().split(" = ")[1],
        test: Number(monkey[3].toString().split(": ")[1].toString().split(" ")[2]),
        true: Number(monkey[4].toString().split(": ")[1].toString().split(" ")[3]),
        false: Number(monkey[5].toString().split(": ")[1].toString().split(" ")[3])
    };

    monkeys.push(newMonkey);
})

monkeys.forEach(monkey => console.log(monkey));
