const express = require("express");
const {
  createTodoController,
  getTodoController,
  deleteTodoController,
  updateController,
} = require("../controller/todoController");
const authMiddleware = require("../middlewares/authMiddleware");

//router Object
const router = express.Router();

//createtodo
router.post("/create", authMiddleware, createTodoController);
//gettodo
router.post("/getAll/:userId", authMiddleware, getTodoController);
router.delete("/delete/:id", authMiddleware, deleteTodoController);
router.patch("/update/:id", authMiddleware, updateController);

module.exports = router;
