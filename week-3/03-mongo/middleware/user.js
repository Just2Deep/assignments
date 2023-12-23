const { User } = require("../db");

async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const { username, password } = req.headers;

    if (!username || !password) {
        return res.status(400).json({ message: "login credentials missing!" });
    }

    const user = await User.findOne({ username });

    if (!user) {
        return res.status(400).json({ message: "User does not exist" });
    }

    if (user.password !== password) {
        return res
            .status(400)
            .json({ message: "Incorrect username or password!" });
    }
    next();
}

module.exports = userMiddleware;
