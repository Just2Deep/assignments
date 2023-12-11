const fs = require("fs");

const content = "This is sample content to be added to a file";

function writeFile(cb) {
    fs.writeFile("writing_test.txt", content, "utf-8", (err) => {
        if (err) {
            cb(err);
        }
        cb("done");
    });
}

writeFile((data) => {
    console.log(data);
});
