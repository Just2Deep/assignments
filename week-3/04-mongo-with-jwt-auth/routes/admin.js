const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();

// Admin Routes
app.post("/signup", async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res
                .status(400)
                .json({ message: "All fields are required!" });
        }

        const admin = await Admin.findOne({ username });

        if (admin) {
            return res.status(409).json({ message: "user already exists!" });
        }

        const newAdmin = await Admin.create({ username, password });
        if (!newAdmin) {
            return res
                .status(500)
                .json({ message: "error while creating user!" });
        }

        return res.status(200).json({ message: "Admin created succcessfully" });
    } catch (error) {
        throw res.status(500).json({ message: "Internal Error" });
    }
});

app.post("/signin", (req, res) => {
    // Implement admin signup logic
});

app.post("/courses", adminMiddleware, (req, res) => {
    const { title, description, price, imageLink } = req.body;

    if (!(title && description && price && imageLink)) {
        return res.status(400).json({ message: "All fields are mandatory" });
    }

    const course = Course.create({
        title,
        description,
        price,
        imageLink,
        published: true,
    });

    if (!course) {
        return res
            .status(500)
            .json({ message: "some error while creating course" });
    }
});

app.get("/courses", adminMiddleware, async (req, res) => {
    const courses = await Course.find({ published: true });

    return res.status(200).json({ courses });
});

module.exports = router;
