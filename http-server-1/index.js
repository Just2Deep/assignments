const express = require("express");

const app = express();

app.get("/", (req, res) => {
    return res.status(200).json({
        hello,
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
