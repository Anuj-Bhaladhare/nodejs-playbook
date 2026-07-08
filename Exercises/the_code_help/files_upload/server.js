const express = require("express");
const cookieParser = require("cookie-parser");
const router = require("./routes/fileUpload.js")
const expressFileupload = require("express-fileupload");
require("dotenv").config();

// define variable
const app = express();
const PORT = process.env.PORT || 5001

// configur parser
app.use(express.json());        // JSON Parser
app.use(cookieParser());        // Cookie Parser
app.use(expressFileupload());   // Used for File Upload

// Setup Routers
app.get("/", (req, res) => {
    res.send(`<h1>Server Started at Port number ${PORT}</h1>`);
    console.log(`This is Default route for Port number ${PORT}`);
});

app.use("/api/v1/upload", router);

// Start Express our Server here
app.listen(PORT, () => {
    console.log(`Server Started at Port number ${PORT}`);
})
