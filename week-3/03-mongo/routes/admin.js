const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();

// Admin Routes
<<<<<<< HEAD
router.post("/signup", async (req, res) => {
    // - POST /admin/signup
    //   Description: Creates a new admin account.
    //   Input Body: { username: 'admin', password: 'pass' }
    //   Output: { message: 'Admin created successfully' }
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

        const newAdmin = Admin.create({ username, password });
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

router.post("/courses", adminMiddleware, (req, res) => {
    // - POST /admin/courses
    // Description: Creates a new course.
    // Input: Headers: { 'username': 'username', 'password': 'password' }, Body: { title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com' }
    // Output: { message: 'Course created successfully', courseId: "new course id" }
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

    return res
        .status(200)
        .json({ message: "course created successfully", courseId: course._id });
});

router.get("/courses", adminMiddleware, async (req, res) => {
=======
router.post('/signup', (req, res) => {
    // Implement admin signup logic
});

router.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic
});

router.get('/courses', adminMiddleware, (req, res) => {
>>>>>>> 081be9ec66420098381ce7ce9e4291ba35ec3658
    // Implement fetching all courses logic
    // - GET /admin/courses
    // Description: Returns all the courses.
    // Input: Headers: { 'username': 'username', 'password': 'password' }
    // Output: { courses: [ { id: 1, title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true }, ... ] }

    const courses = await Course.find({ published: true });

    return res.status(200).json({ courses });
});

module.exports = router;
