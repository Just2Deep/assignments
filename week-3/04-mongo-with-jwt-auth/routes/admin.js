const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const jwt = require("jsonwebtoken");
const { Admin, Course } = require("../../03-mongo/db");

// Admin Routes
router.post("/signup", async (req, res) => {
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
        console.log(error);
        return res.status(500).json({ message: "Internal Error" });
    }
});

router.post("/signin", async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res
                .status(400)
                .json({ message: "All fields are required!" });
        }

        const admin = await Admin.findOne({ username });

        if (!admin) {
            return res.status(404).json({ message: "User does not exist" });
        }

        if (password !== admin.password) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            {
                _id: admin._id,
                username: admin.username,
            },
            process.env.TOKEN_SECRET
        );

        admin.token = token;
        admin.save();

        return res.status(200).json({ token });
    } catch (error) {
        return res.status(500).json({ message: "Internal Error" });
    }
});

router.post("/courses", adminMiddleware, async (req, res) => {
    const { title, description, price, imageLink } = req.body;

    if (!(title && description && price && imageLink)) {
        return res.status(400).json({ message: "All fields are mandatory" });
    }

    const course = await Course.create({
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

    return res
        .status(201)
        .json({ message: "Course created successfully", courseId: course._id });
});

router.get("/courses", adminMiddleware, async (req, res) => {
    const courses = await Course.find({ published: true });

    return res.status(200).json({ courses });
});

module.exports = router;
