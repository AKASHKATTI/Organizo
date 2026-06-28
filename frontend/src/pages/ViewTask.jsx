import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../utils/api";
import { useAuth } from "../AuthContext.jsx";
import Navbar from "../components/Navbar";
import { DELETE_TASK, GET_TASK, PROFILE } from "../utils/API_Paths";
import {
  ArrowLeft,
  Calendar,
  CheckSquare,
  Clock,
  Info,
  Pencil,
  Tag,
  Trash2,
} from "lucide-react";

const priorityStyle = {
  low: "bg-green-100 text-green-700",
  medium: "bg-yellow-100 text-yellow-700",
  high: "bg-red-100 text-red-700",
};

const ViewTask = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { user } = useAuth();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTask = async () => {
    try {
      const { data } = await api.get(GET_TASK(slug));

      setTask(data.task);
    } catch (error) {
      console.error("Failed to fetch task details:", error);
      // The API interceptor will handle 401s.
      // We could show a "not found" message for other errors like 404.
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleEdit = () => {
    navigate(`/edit-task/${slug}`);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await api.delete(DELETE_TASK(slug));
        navigate("/");
      } catch (error) {
        console.error("Failed to delete task:", error);
        alert("Failed to delete task. Please try again.");
      }
    }
  };

  useEffect(() => {
    fetchTask();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!task) {
    return (
      <div className="flex h-screen items-center justify-center">
        Task not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="mx-auto max-w-4xl px-4 py-8">
        <div className="mb-6">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-100"
          >
            <ArrowLeft size={16} />
            Back
          </button>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm md:p-8">
          {/* Header */}
          <div className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">
              {task.title}
            </h1>
            <div className="flex items-center gap-4">
              <span
                className={`rounded-full px-4 py-1.5 text-sm font-medium capitalize ${
                  priorityStyle[task.priority]
                }`}
              >
                {task.priority}
              </span>
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
              >
                <Pencil size={16} />
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center gap-2 rounded-md bg-red-100 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-200"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>

          {/* Description */}
          {task.description && (
            <p className="mb-8 text-gray-600">{task.description}</p>
          )}

          {/* Meta Info */}
          <div className="mb-8 grid grid-cols-2 gap-x-6 gap-y-4 text-sm md:grid-cols-3">
            <div className="flex items-center gap-3">
              <Info className="h-5 w-5 text-gray-400" />
              <div>
                <p className="font-medium text-gray-500">Status</p>
                <p className="font-semibold capitalize text-gray-800">
                  {task.status}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-gray-400" />
              <div>
                <p className="font-medium text-gray-500">Due Date</p>
                <p className="font-semibold text-gray-800">
                  {new Date(task.taskDate).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-gray-400" />
              <div>
                <p className="font-medium text-gray-500">Est. Minutes</p>
                <p className="font-semibold text-gray-800">
                  {task.estimatedMinutes}
                </p>
              </div>
            </div>
          </div>

          {/* Labels */}
          {task.labels?.length > 0 && (
            <div className="mb-8">
              <h3 className="mb-3 flex items-center gap-2 text-base font-semibold text-gray-700">
                <Tag className="h-5 w-5" /> Labels
              </h3>
              <div className="flex flex-wrap gap-2">
                {task.labels.map((label) => (
                  <span
                    key={label}
                    className="rounded-md bg-gray-100 px-3 py-1 text-sm text-gray-700"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Checklist */}
          {task.checklist?.length > 0 && (
            <div>
              <h3 className="mb-4 flex items-center gap-2 text-base font-semibold text-gray-700">
                <CheckSquare className="h-5 w-5" /> Checklist
              </h3>
              <ul className="space-y-3">
                {task.checklist.map((item) => (
                  <li key={item._id} className="flex items-center gap-3">
                    <input type="checkbox" className="h-4 w-4 rounded" />
                    <span className="text-gray-800">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ViewTask;