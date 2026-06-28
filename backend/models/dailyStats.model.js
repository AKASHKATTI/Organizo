const mongoose = require("mongoose");

const dailyStatsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    totalTasks: {
      type: Number,
      default: 0,
    },

    completedTasks: {
      type: Number,
      default: 0,
    },

    productivityScore: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

dailyStatsSchema.index({ user: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("DailyStats", dailyStatsSchema);