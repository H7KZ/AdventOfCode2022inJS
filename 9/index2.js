const { readFileSync } = require("fs");

const input = readFileSync("./input.txt", "utf8");

const input2 = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`;

const lines = input2.split("\n").map(line => line.split(" ")).map(line => [line[0], Number(line[1])]);

let visited = [];

let lastMove = {
    x: 0,
    y: 0
}

let rope = [{
    x: 0,
    y: 0
},
{
    x: 0,
    y: 0
},
{
    x: 0,
    y: 0
},
{
    x: 0,
    y: 0
},
{
    x: 0,
    y: 0
},
{
    x: 0,
    y: 0
},
{
    x: 0,
    y: 0
},
{
    x: 0,
    y: 0
},
{
    x: 0,
    y: 0
},
{
    x: 0,
    y: 0
}];

lines.forEach(line => {
    let direction = line[0];
    let distance = line[1];

    for (let i = 0; i < distance; i++) {
        

        for (let x = 1; x <= rope.length - 1; x++) {
            lastMove = {
                x: rope[rope.length - 1].x,
                y: rope[rope.length - 1].y
            };

            if (!isCloseToHead(rope[rope.length - 1].x, rope[rope.length - 1].y, rope[x].x, rope[x].y)) {
                rope[x].x = lastMove.x;
                rope[x].y = lastMove.y;
            }

            if (x === rope.length - 1 && visited.every(point => point.x !== rope[x].x || point.y !== rope[x].y)) {
                visited.push({
                    x: rope[x].x,
                    y: rope[x].y
                });
            }
        }

        switch (direction) {
            case "R":
                rope[rope.length - 1].x++;
                break;
            case "L":
                rope[rope.length - 1].x--;
                break;
            case "U":
                rope[rope.length - 1].y++;
                break;
            case "D":
                rope[rope.length - 1].y--;
                break;
        }

        console.log("HEAD " + rope[rope.length - 1].x + " " + rope[rope.length - 1].y);
    }
});

console.log(visited.length);

function isCloseToHead(headX, headY, tailX, tailY) {
    // SAME
    if (headX === tailX && headY === tailY) {
        console.log("SAME");
        return true;
    };

    // HORIZONTAL
    if ((headX === tailX + 1 || headX === tailX - 1) && headY === tailY) {
        console.log("HORIZONTAL");
        return true;
    }

    // VERTICAL
    if ((headY === tailY + 1 || headY === tailY - 1) && headX === tailX) {
        console.log("VERTICAL");
        return true;
    }

    // DIAGONAL
    if (headX === tailX + 1 && headY === tailY + 1) {
        console.log("DIAGONAL 1");
        return true;
    }

    if (headX === tailX - 1 && headY === tailY - 1) {
        console.log("DIAGONAL 2");
        return true;
    }

    if (headX === tailX + 1 && headY === tailY - 1) {
        console.log("DIAGONAL 3");
        return true;
    }

    if (headX === tailX - 1 && headY === tailY + 1) {
        console.log("DIAGONAL 4");
        return true;
    }

    return false;
}