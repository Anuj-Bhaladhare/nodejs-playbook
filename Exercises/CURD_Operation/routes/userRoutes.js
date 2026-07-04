const express = require("express");
const router = express.Router()

const {
    createUserController,
    getUserController,
    updateUserController,
    deleteUserController
} = require("./../controllers/userController")

router.post("/create", createUserController);       // Not Working
router.get("/get", getUserController);              // Working Properlly
router.put("/update", updateUserController);        // Not Working
router.delete("/delete", deleteUserController);     // Not Working

module.exports = router;
