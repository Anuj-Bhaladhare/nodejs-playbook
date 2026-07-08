const express = require("express");
const router = express.Router();

const { loginUser, signUpUser } = require("./../controllers/Auth.js");
// imports the middleweres
const { auth, isStudent, isAdmin } = require("./../middlewares/auth.js");

// user Registration and Login
router.post("/login", loginUser);
router.post("/signup", signUpUser);


// testing protected routes
router.get("/test", auth, (req, res) => {
    res.json({
        success: true, 
        message: "Welcome to the Test Protected route for the Anuj"
    });
});

// Protected Routes
router.get("/student", auth, isStudent, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to the protected route for the student"
    });
});

router.get("/admin", auth, isAdmin, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to the protected route for the Admin"
    })
});

module.exports = router;
