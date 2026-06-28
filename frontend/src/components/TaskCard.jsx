import React, { useEffect, useRef, useState } from "react";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Draggable } from "@hello-pangea/dnd";

const priorityStyle = {
  low: "bg-green-100 text-green-700",
  medium: "bg-yellow-100 text-yellow-700",
  high: "bg-red-100 text-red-700",
};

const TaskCard = ({
  task,
  index,
  onEdit,
  onDelete,
  onClick,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={() => onClick(task.slug)}
          className={`cursor-grab rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md ${
            snapshot.isDragging ? "rotate-1 shadow-xl" : ""
          }`}
        >
          <div className="flex items-start justify-between">
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                priorityStyle[task.priority]
              }`}
            >
              {task.priority.toUpperCase()}
            </span>

            <div
              className="relative"
              ref={menuRef}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setMenuOpen((prev) => !prev)}
                className="rounded-md p-2 hover:bg-gray-100"
              >
                <MoreHorizontal size={18} />
              </button>

              {menuOpen && (
                <div className="absolute right-0 z-20 mt-2 w-40 rounded-lg border bg-white shadow-lg">
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      onEdit(task.slug);
                    }}
                    className="flex w-full items-center gap-2 px-4 py-3 hover:bg-gray-100"
                  >
                    <Pencil size={16} />
                    Edit
                  </button>

                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      onDelete(task.slug);
                    }}
                    className="flex w-full items-center gap-2 px-4 py-3 text-red-600 hover:bg-red-50"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>

          <h2 className="mt-4 text-lg font-semibold">{task.title}</h2>

          <p className="mt-2 line-clamp-3 text-sm text-gray-500">
            {task.description}
          </p>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;