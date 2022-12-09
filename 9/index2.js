const { readFileSync } = require("fs");

const input = readFileSync("./input.txt", "utf8");

const lines = input.split("\n");

let treeMap = lines.map((line) => line.split("")).map(trees => trees.map(Number));

let treesToSee = [];

for (let i = 0; i < treeMap.length; i++) {
    for (let x = 0; x < treeMap[i].length; x++) {
        if (i === 0 || x === 0 || i === treeMap.length - 1 || x === treeMap[i].length - 1) {
            continue;
        }

        let canSeeTree = {
            top: 1,
            right: 1,
            bottom: 1,
            left: 1
        }

        for (let t = i - 1; t > 0; t--) {
            if (treeMap[i][x] <= treeMap[t][x]) {
                break;
            }
            canSeeTree.top++;
        }

        for (let r = x + 1; r < treeMap[i].length - 1; r++) {
            if (treeMap[i][x] <= treeMap[i][r]) {
                break;
            }
            canSeeTree.right++;
        }
        
        for (let b = i + 1; b < treeMap.length - 1; b++) {
            if (treeMap[i][x] <= treeMap[b][x]) {
                break;
            }
            canSeeTree.bottom++;
        }

        for (let l = x - 1; l > 0; l--) {
            if (treeMap[i][x] <= treeMap[i][l]) {
                break;
            }
            canSeeTree.left++;
        }

        treesToSee.push(canSeeTree.top * canSeeTree.right * canSeeTree.bottom * canSeeTree.left);
    }
}

console.log(Math.max(...treesToSee));