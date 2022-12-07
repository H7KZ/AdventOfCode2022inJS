const { readFileSync } = require("fs");

const input = readFileSync("./input.txt", "utf8");

const lines = input.split("\r\n");

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
}).reverse();

let dirSizes = [];

fileStructure.forEach(s => {
    let size = 0;

    s.files.forEach(f => {

        if (f.type === "file") {
            size += f.size;
        } else {
            let dirSize = dirSizes.find(d => d.path.join("/") === s.path.concat(f.name).join("/"));

            if (dirSize) {
                size += dirSize.size;
            }
        }
    });

    dirSizes.push(new Object({
        path: s.path,
        size: size
    }));
});

dirSizes.sort((a, b) => {
    if (a.size < b.size) {
        return -1;
    } else if (a.size > b.size) {
        return 1;
    } else {
        return 0;
    }
});

dirSizes.filter(d => d.size > dirSizes[dirSizes.length - 1].size - 40000000).every(d => {
    console.log(d.path.join("/") + " " + d.size);
    return false;
});