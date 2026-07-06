const express = require("express");
const app = express();

app.listen(3000, () => {
    console.log("Server started at port number 3000");
})

app.get("/", (req, res) => {
    res.send("Hello ji, kese ho sare mama log");
});

app.post("/api/create", (req, res) => {
    const { email, name } = req.body;

    res.send("this is the post request");
})
