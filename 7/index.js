const { readFileSync } = require("fs");

const input = readFileSync("./input.txt", "utf8");

const lines = input.split("\n");

let path = [];

let fileStructure = [];

for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith("$")) {
        switch (lines[i].split(" ")[1]) {
            case "cd":
                if (lines[i].split(" ")[2] === "/") {
                    path = [];
                } else if (lines[i].split(" ")[2] === "..") {
                    path.pop();
                } else {
                    path.push(lines[i].split(" ")[2]);
                }

                break;
            case "ls":
                let files = [];
                for (let x = i + 1; x < lines.length; x++) {
                    if (lines[x].startsWith("$")) {
                        break;
                    }

                    files.push({
                        type: lines[x].split(" ")[0].startsWith("dir") ? "dir" : "file",
                        name: lines[x].split(" ")[1],
                        size: lines[x].split(" ")[0].startsWith("dir") ? 0 : Number(lines[x].split(" ")[0])
                    });

                    i = x;
                }

                fileStructure.push(new Object({
                    path: structuredClone(path),
                    files: files
                }))

                break;
        }
    }
}

fileStructure.sort((a, b) => {
    if (a.path.length > b.path.length) {
        return 1;
    } else if (a.path.length < b.path.length) {
        return -1;
    } else {
        return 0;
    }
});

let dirs = [];

fileStructure.map(dir => {
    dirs.push({ path: dir.path[dir.path.length - 1] ?? '', files: dir.files, size: dir.size });
});

dirs.reverse();

let dirSizes = [];

dirs.forEach(dir => {
    let size = 0;

    dir.files.map(file => {
        size += file.size;
        if (file.type === "dir") {
            let dirSize = dirSizes.find(d => d.path === file.name);
            if (dirSize) {
                size += dirSize.size;
            }
        }
    });

    dir.size = size;

    dirSizes.push({path: dir.path, size: size});
});

let totalSize = 0;

dirSizes.forEach(dir => {
    totalSize += dir.size <= 100000 ? dir.size : 0;
});

console.log(totalSize);