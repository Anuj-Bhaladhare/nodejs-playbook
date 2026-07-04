const express = require("express");

// Initilized Express App
const app = express();

// import routers 
const router = require("./routes/userRoutes");

// for using the .env files
require("dotenv").config();

// Define PORT
const PORT = process.env.PORT;

// App using JSON value
app.use(express.json());

// define user Routes
app.use("/users" , router);

// Simple get request
app.get("/get", (req, res) => {
    return res.status(200).json({
        success: true,
        message: "this is the get request || App Ruing successfuly"
    })
});

// Start backend server
app.listen(PORT, (req, res) => {
    console.log(`Server is Started AT port number ${PORT}`);
});


