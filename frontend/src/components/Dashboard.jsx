import React, { useMemo } from "react";
import TasksList from "./TasksList";
import { DragDropContext } from "@hello-pangea/dnd";

const Dashboard = ({ tasks, onEdit, onDelete, onClick, onDragEnd }) => {
  const { todo, progress, completed } = useMemo(() => {
    const todo = tasks.filter((task) => task.status === "todo");
    const progress = tasks.filter((task) => task.status === "in-progress");
    const completed = tasks.filter((task) => task.status === "completed");
    return { todo, progress, completed };
  }, [tasks]);
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
        <TasksList
          droppableId="todo"
          title="Todo"
          tasks={todo}
          onEdit={onEdit}
          onDelete={onDelete}
          onClick={onClick}
        />
        <TasksList
          droppableId="in-progress"
          title="In Progress"
          tasks={progress}
          onEdit={onEdit}
          onDelete={onDelete}
          onClick={onClick}
        />
        <TasksList
          droppableId="completed"
          title="Completed"
          tasks={completed}
          onEdit={onEdit}
          onDelete={onDelete}
          onClick={onClick}
        />
      </div>
    </DragDropContext>
  );
};

export default Dashboard;