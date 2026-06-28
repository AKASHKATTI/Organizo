import React from "react";
import {
  format,
  addDays,
  subDays,
  isSameDay,
  parseISO,
} from "date-fns";
import { Calendar as CalendarIcon, PlusIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { cn } from "@/lib/utils";
import { Button } from "./ui/Button";

const InteractiveDailyPlanner = ({ value, onChange }) => {
  const navigate = useNavigate();
  const selectedDateObj = parseISO(value);

  // Generate date cards for the week view, centered around the selected date
  const dateCards = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(subDays(selectedDateObj, 3), i);
    return {
      dayName: format(date, "EEE").toUpperCase(),
      dayNumber: format(date, "d"),
      month: format(date, "MMM").toUpperCase(),
      fullDate: format(date, "yyyy-MM-dd"),
    };
  });

  const handleDatePickerChange = (e) => {
    if (!e.target.value) return;
    onChange(e.target.value);
  };

  return (
    <div className="w-full bg-gray-50">
      {/* Main Container */}
      <div className="w-full bg-white border border-gray-200 rounded-2xl p-4 md:p-6 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-sm">
        {/* Left Section: Create Task Button */}
        <Button
          className="bg-indigo-600 hover:bg-indigo-700 w-full lg:w-auto"
          onClick={() => navigate("/create-task")}
        >
          <PlusIcon className="mr-2 h-5 w-5" />
          Create Task
        </Button>

        {/* Center Section: Date Cards */}
        <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto no-scrollbar py-1 justify-center">
          {dateCards.map((card) => {
            const isSelected = isSameDay(parseISO(card.fullDate), selectedDateObj);
            return (
              <button
                key={card.fullDate}
                onClick={() => onChange(card.fullDate)}
                className={cn(
                  "flex flex-col items-center justify-between w-16 h-24 rounded-xl transition-all duration-200 focus:outline-none flex-shrink-0",
                  isSelected
                    ? "bg-indigo-600 text-white shadow-lg transform scale-105"
                    : "bg-gray-100 border border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-800"
                )}
              >
                <span
                  className={cn(
                    "text-[10px] font-bold tracking-wider mt-3",
                    isSelected ? "text-indigo-200" : "text-gray-400"
                  )}
                >
                  {card.dayName}
                </span>
                <span className="text-2xl font-bold -mt-1">
                  {card.dayNumber}
                </span>
                <span
                  className={cn(
                    "text-[10px] font-bold tracking-wider mb-2",
                    isSelected ? "text-indigo-200" : "text-gray-400"
                  )}
                >
                  {card.month}
                </span>
                {isSelected && (
                  <span className="w-1.5 h-1.5 bg-white rounded-full mb-1.5 animate-pulse" />
                )}
              </button>
            );
          })}
        </div>

        {/* Right Section: Jump to Date */}
        <div className="flex items-center gap-3 self-center lg:self-center">
          <div className="relative group">
            <input
              type="date"
              value={value}
              onChange={handleDatePickerChange}
              className="bg-transparent border border-gray-300 text-gray-700 rounded-full px-4 py-2 text-sm font-medium tracking-wide focus:outline-none focus:border-indigo-500 transition-colors duration-200 cursor-pointer appearance-none date-input-icon"
              style={{ colorScheme: "light" }}
            />
             <CalendarIcon className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-indigo-500 transition-colors" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveDailyPlanner;