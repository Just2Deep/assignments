const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const { default: mongoose } = require("mongoose");

// User Routes
<<<<<<< HEAD
router.post("/signup", async (req, res) => {
    //   - POST /users/signup
    //   Description: Creates a new user account.
    //   Input: { username: 'user', password: 'pass' }
    //   Output: { message: 'User created successfully' }
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
        throw res.status(500).json({ message: "Internal Error" });
    }
});

router.get("/courses", async (req, res) => {
    //   - GET /users/courses
    //   Description: Lists all the courses.
    //   Input: Headers: { 'username': 'username', 'password': 'password' }
    //   Output: { courses: [ { id: 1, title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true }, ... ] }
    const courses = await Course.find({ published: true });

    return res.status(200).json({ courses });
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
    // - POST /users/courses/:courseId
    //   Description: Purchases a course. courseId in the URL path should be replaced with the ID of the course to be purchased.
    //   Input: Headers: { 'username': 'username', 'password': 'password' }
    //   Output: { message: 'Course purchased successfully' }
    const courseId = req.params.courseId;

    const isValid = mongoose.isValidObjectId(courseId);

    if (!isValid) {
        return res.status(404).json({ message: "invalid course id" });
    }

    const course = await Course.findById(courseId);

    if (!course) {
        return res.status(404).json({ message: "course does not exist" });
    }

    await User.findOneAndUpdate(
        {
            username: req.headers?.username,
        },
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
    // - GET /users/purchasedCourses
    // Description: Lists all the courses purchased by the user.
    // Input: Headers: { 'username': 'username', 'password': 'password' }
    // Output: { purchasedCourses: [ { id: 1, title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true }, ... ] }

    const user = await User.findOne({
        username: req.headers?.username,
    }).populate("purchasedCourses");

    return res.status(200).json({ purchasedCourses: user.purchasedCourses });
});

module.exports = router;
=======
router.post('/signup', (req, res) => {
    // Implement user signup logic
});

router.get('/courses', (req, res) => {
    // Implement listing all courses logic
});

router.post('/courses/:courseId', userMiddleware, (req, res) => {
    // Implement course purchase logic
});

router.get('/purchasedCourses', userMiddleware, (req, res) => {
    // Implement fetching purchased courses logic
});

module.exports = router
>>>>>>> 081be9ec66420098381ce7ce9e4291ba35ec3658
