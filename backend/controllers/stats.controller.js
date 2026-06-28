import DailyStats from "../models/dailyStats.model.js";
import Task from "../models/task.model.js";

// GET DAILY STATS
export const getDailyStats = async (req, res) => {
  try {
    const userId = req.user.id;
    const { date } = req.query;

    // Use the provided date or default to today
    const targetDate = date ? new Date(date) : new Date();
    targetDate.setHours(0, 0, 0, 0);

    const startOfDay = new Date(targetDate);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(targetDate);
    endOfDay.setHours(23, 59, 59, 999);

    const totalTasks = await Task.countDocuments({
      user: userId,
      taskDate: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    });

    const completedTasks = await Task.countDocuments({
      user: userId,
      status: "completed",
      taskDate: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    });

    const productivityScore =
      totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

    const stats = await DailyStats.findOneAndUpdate(
      { user: userId, date: targetDate },
      {
        user: userId,
        date: targetDate,
        totalTasks,
        completedTasks,
        productivityScore,
      },
      { upsert: true, new: true }
    );

    return res.status(200).json({
      success: true,
      stats,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
