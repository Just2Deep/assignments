const fs = require("fs");

function readContent(cb) {
    fs.readFile("week-2/01-async-js/easy/sample.txt", "utf-8", (err, data) => {
        if (err) {
            return cb(err);
            // throw new Error(err);
        }
        cb(data);
    });
}

function print(data) {
    console.log(data);
}

readContent(print);

let j = 0;
for (let index = 0; index < 100000000000; index++) {
    j += 1;
}
console.log("Completed");
