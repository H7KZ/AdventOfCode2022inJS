const { readFileSync } = require("fs");

const input = readFileSync("./input.txt", "utf8");

const lava = input
  .split("\r\n")
  .filter((s) => s) // Filter out empty strings
  .map((l) => l.split(",").map(Number));

const xMax = Math.max(...lava.map(([x]) => x));
const yMax = Math.max(...lava.map(([, y]) => y));
const zMax = Math.max(...lava.map(([, , z]) => z));

const grid = new Array(xMax + 1)
  .fill(0)
  .map(() =>
    new Array(yMax + 1).fill(0).map(() => new Array(zMax + 1).fill(0))
  );

lava.forEach(([x, y, z]) => {
  grid[x][y][z] = 1;
});

let surfaceArea = 0;
for (let x = 0; x <= xMax; x++) {
  for (let y = 0; y <= yMax; y++) {
    for (let z = 0; z <= zMax; z++) {
      if (grid[x][y][z] === 0) {
        if (
          x === 0 ||
          x === xMax ||
          y === 0 ||
          y === yMax ||
          z === 0 ||
          z === zMax
        )
          continue;
        if (
          grid[x - 1][y][z] !== 0 &&
          grid[x + 1][y][z] !== 0 &&
          grid[x][y - 1][z] !== 0 &&
          grid[x][y + 1][z] !== 0 &&
          grid[x][y][z - 1] !== 0 &&
          grid[x][y][z + 1] !== 0
        ) {
          surfaceArea -= 6;
        }
        continue;
      }

      if (x === 0 || grid[x - 1][y][z] === 0) surfaceArea++;
      if (x === xMax || grid[x + 1][y][z] === 0) surfaceArea++;
      if (y === 0 || grid[x][y - 1][z] === 0) surfaceArea++;
      if (y === yMax || grid[x][y + 1][z] === 0) surfaceArea++;
      if (z === 0 || grid[x][y][z - 1] === 0) surfaceArea++;
      if (z === zMax || grid[x][y][z + 1] === 0) surfaceArea++;
    }
  }
}

console.log(surfaceArea);