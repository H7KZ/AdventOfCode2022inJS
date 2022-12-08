const { readFileSync } = require("fs");

const input = readFileSync("./input.txt", "utf8");

const lines = input.split("\n");

let treeMap = lines.map((line) => line.split("")).map(trees => trees.map(Number));

let treesToSee = 0;

for (let i = 0; i < treeMap.length; i++) {
    for (let x = 0; x < treeMap[i].length; x++) {
        if (i === 0 || x === 0 || i === treeMap.length - 1 || x === treeMap[i].length - 1) {
            treesToSee++;
            continue;
        }

        let canSeeTree = {
            top: true,
            right: true,
            bottom: true,
            left: true
        }

        for (let t = i - 1; t >= 0; t--) {
            if (treeMap[i][x] <= treeMap[t][x]) {
                canSeeTree.top = false;
                break;
            }
        }

        for (let r = x + 1; r <= treeMap[i].length - 1; r++) {
            if (treeMap[i][x] <= treeMap[i][r]) {
                canSeeTree.right = false;
                break;
            }
        }
        
        for (let b = i + 1; b <= treeMap.length - 1; b++) {
            if (treeMap[i][x] <= treeMap[b][x]) {
                canSeeTree.bottom = false;
                break;
            }
        }

        for (let l = x - 1; l >= 0; l--) {
            if (treeMap[i][x] <= treeMap[i][l]) {
                canSeeTree.left = false;
                break;
            }
        }

        treesToSee += Object.values(canSeeTree).filter(Boolean).length > 0 ? 1 : 0;
    }
}

console.log(treesToSee);