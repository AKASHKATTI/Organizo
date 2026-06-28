const express = require('express');

const router = express.Router();

const authMiddleware = require('../middleware/auth.middleware');

const { createTask ,getAllTasks, updateTask , getTask , deleteTask , dragAndDropTask }  = require("../controllers/tasks.controller");


router.post("/create-task" , authMiddleware, createTask);
router.get("/get-all-tasks" , authMiddleware, getAllTasks);

router.patch("/drag-and-drop-task/:slug" , authMiddleware, dragAndDropTask);


router.put("/update-task/:slug" , authMiddleware, updateTask);
router.get("/get-task/:slug" , authMiddleware, getTask);
router.delete("/delete-task/:slug" , authMiddleware, deleteTask);


module.exports = router;