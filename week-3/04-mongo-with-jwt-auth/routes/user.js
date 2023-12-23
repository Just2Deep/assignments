const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../../03-mongo/db");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

// User Routes
router.post("/signup", async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res
                .status(400)
                .json({ message: "All fields are required!" });
        }

        const user = await User.findOne({ username });

        if (user) {
            return res.status(409).json({ message: "user already exists!" });
        }

        const newUser = await User.create({ username, password });
        if (!newUser) {
            return res
                .status(500)
                .json({ message: "error while creating user!" });
        }

        return res.status(200).json({ message: "User created succcessfully" });
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

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: "User does not exist" });
        }

        if (password !== user.password) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            {
                _id: user._id,
                username: user.username,
            },
            process.env.TOKEN_SECRET
        );

        user.token = token;
        user.save();

        return res.status(200).json({ token });
    } catch (error) {
        return res.status(500).json({ message: "Internal Error" });
    }
});

router.get("/courses", async (req, res) => {
    const courses = await Course.find({ published: true });

    return res.status(200).json({ courses });
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
    const courseId = req.params.courseId;

    const isValid = mongoose.isValidObjectId(courseId);

    if (!isValid) {
        return res.status(404).json({ message: "invalid course id" });
    }

    const course = await Course.findById(courseId);

    if (!course) {
        return res.status(404).json({ message: "course does not exist" });
    }

    await User.findByIdAndUpdate(
        req.user._id,
        {
            $addToSet: {
                purchasedCourses: course?._id,
            },
        },
        { new: true }
    );

    return res.status(200).json({ message: "Course purchased successfully" });
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
    const user = await User.findById(req.user?._id).populate(
        "purchasedCourses"
    );

    return res.status(200).json({ purchasedCourses: user.purchasedCourses });
});

module.exports = router;
