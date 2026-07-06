const express = require("express");
const app = express();

// import router file
const router = require("./routes/blog.js")

// dot env file configuration
require("dotenv").config();

// port and vriable define
const PORT = process.env.PORT

// config parser
app.use(express.json());

app.use("/api/v1", router);

app.get("/", (req, res) => {
    app.send(`<h1> Server Started at Port number ${PORT} </h1>`);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server Started at Port number ${PORT}`);
});

