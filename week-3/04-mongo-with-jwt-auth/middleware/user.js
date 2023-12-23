const { User } = require("../../03-mongo/db");
const jwt = require("jsonwebtoken");

async function userMiddleware(req, res, next) {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(400).json({ message: "token missing" });
        }

        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

        const user = await User.findById(decodedToken?._id);

        if (!user) {
            return res
                .status(400)
                .json({ message: "Invalid or Expired Token" });
        }

        req.user = user;

        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid  Token" });
    }
}

module.exports = userMiddleware;
