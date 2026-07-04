const express = require("express");
const router = express.Router()

const {
    createUserController,
    getUserController,
    updateUserController,
    deleteUserController
} = require("./../controllers/userController")

router.post("/create", createUserController);       // Working Properlly
router.get("/get", getUserController);              // Working Properlly
router.put("/update/:id", updateUserController);        // Not Working
router.delete("/delete/:id", deleteUserController);     // Working Properlly

module.exports = router;
