const jwt = require("jsonwebtoken");
const { Admin } = require("../../03-mongo/db");

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(400).json({ message: "token missing" });
        }

        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

        const admin = await Admin.findById(decodedToken?._id);

        if (!admin) {
            return res
                .status(400)
                .json({ message: "Invalid or Expired Token" });
        }

        req.admin = admin;

        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid  Token" });
    }
}

module.exports = adminMiddleware;
