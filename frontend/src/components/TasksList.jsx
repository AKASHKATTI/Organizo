import React from "react";
import TaskCard from "./TaskCard";
import { Droppable } from "@hello-pangea/dnd";

const colors = {
  Todo: "bg-blue-500",
  "In Progress": "bg-yellow-500",
  Completed: "bg-green-500",
};

const TasksList = ({
  droppableId,
  title,
  tasks,
  onEdit,
  onDelete,
  onClick,
}) => {
  return (
    <Droppable droppableId={droppableId}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`rounded-xl border bg-gray-50/50 transition-colors duration-200 ${
            snapshot.isDraggingOver ? "border-indigo-500 bg-indigo-50" : "border-gray-200"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b p-5">
            <div className="flex items-center gap-3">
              <span
                className={`h-3 w-3 rounded-full ${
                  colors[title] || "bg-gray-400"
                }`}
              />
              <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
              <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-600">
                {tasks.length}
              </span>
            </div>
          </div>

          {/* Cards */}
          <div className="space-y-4 p-4 min-h-[100px]">
            {tasks.length ? (
              tasks.map((task, index) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  index={index}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onClick={onClick}
                />
              ))
            ) : (
              !snapshot.isDraggingOver && <div className="py-10 text-center text-gray-400">No Tasks</div>
            )}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
};

export default TasksList;