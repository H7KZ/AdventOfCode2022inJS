const { readFileSync } = require("fs");

const input = readFileSync("./input.txt", "utf8");

const lines = input.split("\r\n\r\n").map(l => l.split("\r\n").map(l => l.split("  ")));

let monkeys = [];

let supermodulo = 1;

lines.forEach(monkey => {
    let newMonkey = {
        name: Number(monkey[0].toString().split(" ")[1].toString().split(":")[0]),
        items: monkey[1].toString().split(": ")[1].toString().split(", ").map(Number),
        operation: monkey[2].toString().split(": ")[1].toString().split(" = ")[1],
        test: Number(monkey[3].toString().split(": ")[1].toString().split(" ")[2]),
        true: Number(monkey[4].toString().split(": ")[1].toString().split(" ")[3]),
        false: Number(monkey[5].toString().split(": ")[1].toString().split(" ")[3]),
        inspected: 0
    }

    monkeys.push(newMonkey);

    supermodulo *= newMonkey.test;
})

for (let i = 0; i < 10000; i++) {
    monkeys.forEach(monkey => {
        let m = JSON.parse(JSON.stringify(monkey));
        m.items.forEach((item) => {
            let worry = eval(m.operation.replaceAll("old", item));

            monkey.inspected++;

            if (worry % monkey.test == 0) {
                monkeys.find(f => f.name == m.true).items.push(worry % supermodulo);
                monkey.items.splice(monkey.items.indexOf(item), 1);
            } else {
                monkeys.find(f => f.name == m.false).items.push(worry % supermodulo);
                monkey.items.splice(monkey.items.indexOf(item), 1);
            }
        });
    });
}

let inspects = monkeys.map(monkey => monkey.inspected).sort((a, b) => b - a);

console.log(inspects[0] * inspects[1]);