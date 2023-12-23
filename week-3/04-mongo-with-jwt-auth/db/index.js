const mongoose = require("mongoose");

// Connect to MongoDB
const DB_NAME = "course";
const response = mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);

// Define schemas
const AdminSchema = new mongoose.Schema(
    {
        // Schema definition here
        username: {
            type: String,
            unique: true,
        },
        password: {
            type: String,
        },
        token: {
            type: String,
        },
    },
    { timestamps: true }
);

const UserSchema = new mongoose.Schema(
    {
        // Schema definition here
        username: {
            type: String,
            unique: true,
        },
        password: {
            type: String,
        },
        token: {
            type: String,
        },
        purchasedCourses: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Course",
            },
        ],
    },
    { timestamps: true }
);

const CourseSchema = new mongoose.Schema({
    // Schema definition here
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
    },
    imageLink: {
        type: String,
    },
    published: {
        type: Boolean,
        default: false,
    },
});

const Admin = mongoose.model("Admin", AdminSchema);
const User = mongoose.model("User", UserSchema);
const Course = mongoose.model("Course", CourseSchema);

module.exports = {
    Admin,
    User,
    Course,
};
