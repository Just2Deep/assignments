require("dotenv").config({ path: ".env" });
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");

const PORT = 3000;

// Middleware for parsing request bodies
app.use(bodyParser.json());
app.use("/admin", adminRouter);
app.use("/user", userRouter);

<<<<<<< HEAD
=======
const PORT = 3000;
>>>>>>> 081be9ec66420098381ce7ce9e4291ba35ec3658
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
