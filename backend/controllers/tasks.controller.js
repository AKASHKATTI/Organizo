import Task from "../models/task.model.js";
import slugify from "slugify";

export const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      taskDate,
      priority,
      status,
      labels,
      estimatedMinutes,
      checklist,
    } = req.body;

    if (!title || !taskDate) {
      return res.status(400).json({
        success: false,
        message: "Title and taskDate are required",
      });
    }

    const task = await Task.create({
      user: req.user.id,
      title,
      slug: slugify(title, { lower: true, strict: true }) + "-" + Date.now(),

      description: description || "",
      taskDate,
      priority: priority || "medium",
      status: status || "todo",
      labels: labels || [],
      estimatedMinutes: estimatedMinutes || 0,
      checklist: checklist || [],
    });

    return res.status(201).json({
        
      success: true,
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// const getAllTasks = async (req, res) => {
//   try {
//     const userId = req.user.id;

//     const startOfDay = new Date();
//     startOfDay.setHours(0, 0, 0, 0);

//     const endOfDay = new Date();
//     endOfDay.setHours(23, 59, 59, 999);

//     // 1. Move incomplete past tasks → today
//     await Task.updateMany(
//       {
//         user: userId,
//         status: { $ne: "completed" },
//         taskDate: { $lt: startOfDay },
//       },
//       {
//         $set: {
//           taskDate: startOfDay,
//         },
//       }
//     );

//     // 2. Get today's tasks
//     const tasks = await Task.find({
//       user: userId,
//       taskDate: {
//         $gte: startOfDay,
//         $lte: endOfDay,
//       },
//     }).sort({ createdAt: -1 });

//     return res.status(200).json({
//       success: true,
//       count: tasks.length,
//       tasks,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };



export const getAllTasks = async (req, res) => {
  try {
    const userId = req.user.id;

    const { date } = req.query;

    console.log(date);

    // Use selected date or today's date
    const selectedDate = req.query.date
      ? new Date(req.query.date)
      : new Date();

    const startOfDay = new Date(selectedDate);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(selectedDate);
    endOfDay.setHours(23, 59, 59, 999);

    // Today's boundaries
    const today = new Date();
    const todayStart = new Date(today);
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date(today);
    todayEnd.setHours(23, 59, 59, 999);



    // Move overdue tasks only when today's tasks are requested
    if (
      startOfDay.getTime() === todayStart.getTime()
    ) {
      await Task.updateMany(
        {
          user: userId,
          status: { $ne: "completed" },
          taskDate: { $lt: todayStart },
        },
        {
          $set: {
            taskDate: todayStart,
          },
        }
      );
    }

    const tasks = await Task.find({
      user: userId,
      taskDate: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    }).sort({
      priority: -1,
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: tasks.length,
      selectedDate: startOfDay,
      tasks,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      slug: req.params.slug,
      user: req.user.id, // ensures user can only access their own task
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    return res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
  {
    slug: req.params.slug,
    user: req.user.id,
  },
  req.body,
  {
    returnDocument: "after",
    runValidators: true,
  }
);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


export const dragAndDropTask = async (req, res) => {
  try {
    const { slug } = req.params;
    const { status } = req.body;

    const allowedStatuses = ["todo", "in-progress", "completed"];

    if (!status || !allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }
    const task = await Task.findOneAndUpdate(
      { slug, user: req.user.id },
      { status },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Task moved successfully",
      task,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};





export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      slug: req.params.slug,
      user: req.user.id, // ensures only owner can delete
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};