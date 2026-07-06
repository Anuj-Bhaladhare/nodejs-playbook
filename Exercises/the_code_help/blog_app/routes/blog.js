const express = require("express");
const router = express.Router();

const aaaaa = () => {
    console.log("aaaaaaaa");
}

router.get("/getroute", aaaaa);

module.exports = router;
