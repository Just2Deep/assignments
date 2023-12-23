const { Admin } = require("../db");

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected

    const { username, password } = req.headers;

    if (!username || !password) {
        return res.status(400).json({ message: "login credentials missing!" });
    }

    const admin = await Admin.findOne({ username: username });

    if (!admin) {
        return res.status(400).json({ message: "Admin does not exist" });
    }

    if (admin.password !== password) {
        return res
            .status(400)
            .json({ message: "Incorrect username or password!" });
    }
    next();
}

module.exports = adminMiddleware;
