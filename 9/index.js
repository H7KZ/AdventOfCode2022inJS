const { readFileSync } = require("fs");

const input = readFileSync("./input.txt", "utf8");

const input2 = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`;

const lines = input.split("\n").map(line => line.split(" ")).map(line => [line[0], Number(line[1])]);

let visited = [{ x: 0, y: 0 }];
let headMoves = [{ x: 0, y: 0 }];
let head = {
    x: 0,
    y: 0
};
let tail = {
    x: 0,
    y: 0
};

lines.forEach(line => {
    let direction = line[0];
    let distance = line[1];

    for (let i = 0; i < distance; i++) {
        switch (direction) {
            case "R":
                head.x++;
                break;
            case "L":
                head.x--;
                break;
            case "U":
                head.y++;
                break;
            case "D":
                head.y--;
                break;
        }

        headMoves.push({
            x: head.x,
            y: head.y
        });

        if (!isCloseToHead(head.x, head.y, tail.x, tail.y)) {
            // console.log("NOT CLOSE");
            tail.x = headMoves[headMoves.length - 2].x;
            tail.y = headMoves[headMoves.length - 2].y;

            if (visited.every(point => point.x !== tail.x || point.y !== tail.y)) {
                visited.push({
                    x: tail.x,
                    y: tail.y
                });
            }
        }

        // console.log("HEAD " + head.x + " " + head.y);
        // console.log("TAIL " + tail.x + " " + tail.y);
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