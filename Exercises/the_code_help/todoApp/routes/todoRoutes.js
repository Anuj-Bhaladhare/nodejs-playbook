const express = require("express");
const router = express.Router();

const {
    createTodoController,
    updateTodoController,
    deleteTodoController,
    readTodoController
} = require("./../controllers/todoController.js");



router.post("/create", createTodoController);
router.get("/getTodos", readTodoController);
router.put("/update", updateTodoController);
router.delete("/delete", deleteTodoController);



module.exports = router;
