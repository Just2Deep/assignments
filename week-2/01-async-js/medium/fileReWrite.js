const fs = require("fs");

const PATH = "week-2/01-async-js/medium/writeTest.txt";

function readFile(cb) {
    fs.readFile(PATH, "utf-8", (err, data) => {
        if (err) {
            throw err;
        }
        return cb(data);
    });
}

function writeFile(data) {
    fs.writeFile(PATH, data, () => console.log());
}

function getData(data) {
    data = data.replace(/\s+/g, " ");
    console.log(data);

    writeFile(data);
}

function readAndWriteFile() {
    readFile(getData);
}

readAndWriteFile();
