import React from "react";
import {
  ClipboardList,
  CheckCircle2,
  Target,
  TrendingUp,
} from "lucide-react";

const StatsSection = ({ stats }) => {
  const total = stats?.totalTasks || 0;
  const completed = stats?.completedTasks || 0;
  const remaining = total - completed;
  const productivity = stats?.productivityScore || 0;

  const cards = [
    {
      title: "Tasks",
      value: total,
      icon: ClipboardList,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      title: "Done",
      value: completed,
      icon: CheckCircle2,
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      title: "Left",
      value: remaining,
      icon: Target,
      color: "text-orange-600",
      bg: "bg-orange-100",
    },
  ];

  return (
    <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">

      <div className="flex flex-wrap items-center justify-between gap-6">

        {/* Stats */}
        <div className="flex flex-wrap items-center gap-6">
          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.title}
                className="flex items-center gap-3"
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${card.bg}`}
                >
                  <Icon className={`h-5 w-5 ${card.color}`} />
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    {card.title}
                  </p>

                  <h3 className="text-lg font-semibold text-gray-800">
                    {card.value}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>

        {/* Productivity */}
        <div className="min-w-[250px] flex-1">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium text-gray-700">
                Productivity
              </span>
            </div>

            <span className="text-sm font-semibold text-purple-600">
              {productivity}%
            </span>
          </div>

          <div className="h-2 rounded-full bg-gray-200">
            <div
              className="h-2 rounded-full bg-purple-600 transition-all duration-500"
              style={{ width: `${productivity}%` }}
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default StatsSection;