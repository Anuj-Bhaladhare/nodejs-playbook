
const express = require("express");
const app = express();

// load config from env
require("dotenv").config()

// define server port 
const PORT = process.env.PORT || 5002

// middleware to parse json request body
app.use(express.json());

// Default Route
app.get("/", (req, res) => {
    res.send(`<h1> This is HOMEPAGE at ${PORT} </h1>` );
});

// import route for todoRoutes
const router = require("./routes/todoRoutes.js");
app.use("/api/v1", router);

// app listen
app.listen(PORT, () => {
    console.log(`App started at port number ${PORT}`);
});

