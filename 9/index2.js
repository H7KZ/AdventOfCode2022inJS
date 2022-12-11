const { readFileSync } = require("fs");

const input = readFileSync("./input.txt", "utf8");

const input2 = `R 5
U 8`;

const lines = input2.split("\n").map(line => line.split(" ")).map(line => [line[0], Number(line[1])]);

let visited = [{ x: 0, y: 0 }];
let rope = [
    { x: 0, y: 0, moves: [ { x: 0, y: 0 } ] },
    { x: 0, y: 0, moves: [ { x: 0, y: 0 } ] },
    { x: 0, y: 0, moves: [ { x: 0, y: 0 } ] },
    { x: 0, y: 0, moves: [ { x: 0, y: 0 } ] },
    { x: 0, y: 0, moves: [ { x: 0, y: 0 } ] },
    { x: 0, y: 0, moves: [ { x: 0, y: 0 } ] },
    { x: 0, y: 0, moves: [ { x: 0, y: 0 } ] },
    { x: 0, y: 0, moves: [ { x: 0, y: 0 } ] },
    { x: 0, y: 0, moves: [ { x: 0, y: 0 } ] },
    { x: 0, y: 0, moves: [ { x: 0, y: 0 } ] },
]

lines.forEach(line => {
    let direction = line[0];
    let distance = line[1];

    for (let i = 0; i < distance; i++) {
        switch (direction) {
            case "R":
                rope[0].x++;
                break;
            case "L":
                rope[0].x--;
                break;
            case "U":
                rope[0].y++;
                break;
            case "D":
                rope[0].y--;
                break;
        }

        rope[0].moves.push({ x: rope[0].x, y: rope[0].y });

        console.log(line);

        for (let x = 0; x < rope.length - 1; x++) {
            console.log(rope[x].x, rope[x].y, rope[x + 1].x, rope[x + 1].y);
            console.log(isCloseToHead(rope[x].x, rope[x].y, rope[x + 1].x, rope[x + 1].y));
            console.log("-----");
            if (!isCloseToHead(rope[x].x, rope[x].y, rope[x + 1].x, rope[x + 1].y)) {
                rope[x + 1].x = rope[x].moves[rope[x].moves.length - 2].x;
                rope[x + 1].y = rope[x].moves[rope[x].moves.length - 2].y;

                rope[x + 1].moves.push({ x: rope[x + 1].x, y: rope[x + 1].y });

                if (visited.every(point => point.x !== rope[9].x || point.y !== rope[9].y)) {
                    visited.push({
                        x: rope[9].x,
                        y: rope[9].y
                    });
                }
            }
        }
    }
});

console.log(visited.length);

function isCloseToHead(headX, headY, tailX, tailY) {
    // SAME
    if (headX === tailX && headY === tailY) {
        // console.log("SAME");
        return true;
    };

    // HORIZONTAL
    if ((headX === tailX + 1 || headX === tailX - 1) && headY === tailY) {
        // console.log("HORIZONTAL");
        return true;
    }

    // VERTICAL
    if ((headY === tailY + 1 || headY === tailY - 1) && headX === tailX) {
        // console.log("VERTICAL");
        return true;
    }

    // DIAGONAL
    if (headX === tailX + 1 && headY === tailY + 1) {
        // console.log("DIAGONAL 1");
        return true;
    }

    if (headX === tailX - 1 && headY === tailY - 1) {
        // console.log("DIAGONAL 2");
        return true;
    }

    if (headX === tailX + 1 && headY === tailY - 1) {
        // console.log("DIAGONAL 3");
        return true;
    }

    if (headX === tailX - 1 && headY === tailY + 1) {
        // console.log("DIAGONAL 4");
        return true;
    }

    return false;
}