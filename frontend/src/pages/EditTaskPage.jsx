import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import api from "../utils/api";
import { Button } from "../components/ui/Button";
import { GET_TASK, UPDATE_TASK } from "../utils/API_Paths";

const EditTaskPage = () => {
  const navigate = useNavigate();
  const { slug } = useParams();

  const [loading, setLoading] = useState(false);
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "medium",
    status: "todo",
    taskDate: "",
    estimatedMinutes: "",
    labels: "",
    checklist: "",
  });

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const { data } = await api.get(GET_TASK(slug));
        const taskData = data.task;
        setTask({
          title: taskData.title,
          description: taskData.description || "",
          priority: taskData.priority,
          status: taskData.status,
          taskDate: new Date(taskData.taskDate).toISOString().split("T")[0],
          estimatedMinutes: taskData.estimatedMinutes?.toString() || "",
          labels: taskData.labels?.join(", ") || "",
          checklist:
            taskData.checklist?.map((item) => item.text).join(", ") || "",
        });
      } catch (error) {
        console.error("Failed to fetch task", error);
        alert("Failed to load task data. Please try again.");
        navigate("/");
      }
    };

    fetchTask();
  }, [slug]);

  const handleChange = (e) => {
    setTask((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...task,
        estimatedMinutes: Number(task.estimatedMinutes) || 0,
        labels: task.labels
          .split(",")
          .map((label) => label.trim())
          .filter(Boolean),
        checklist: task.checklist
          .split(",")
          .map((item) => ({ text: item.trim() }))
          .filter((item) => item.text),
      };

      await api.patch(UPDATE_TASK(slug), payload);

      navigate("/");
    } catch (error) {
      console.error("Failed to update task:", error);
      alert(error.response?.data?.message || "Unable to update task.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 px-4">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-100"
          >
            <ArrowLeft size={16} />
            Back
          </button>
        </div>

        <div className="mx-auto rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <h2 className="mb-6 text-2xl font-bold text-gray-800">Edit Task</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Title */}
            <div>
              <label className="mb-2 block text-sm font-medium">Title</label>
              <Input name="title" value={task.title} onChange={handleChange} required />
            </div>
            {/* Description */}
            <div>
              <label className="mb-2 block text-sm font-medium">Description</label>
              <Textarea rows={4} name="description" value={task.description} onChange={handleChange} />
            </div>
            {/* Priority & Status */}
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">Priority</label>
                <select name="priority" value={task.priority} onChange={handleChange} className="w-full rounded-md border border-gray-300 p-2">
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Status</label>
                <select name="status" value={task.status} onChange={handleChange} className="w-full rounded-md border border-gray-300 p-2">
                  <option value="todo">Todo</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
            {/* Date & Estimated Minutes */}
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">Task Date</label>
                <Input type="date" name="taskDate" value={task.taskDate} onChange={handleChange} />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Estimated Minutes</label>
                <Input type="number" name="estimatedMinutes" value={task.estimatedMinutes} onChange={handleChange} />
              </div>
            </div>
            {/* Labels */}
            <div>
              <label className="mb-2 block text-sm font-medium">Labels (comma-separated)</label>
              <Input name="labels" value={task.labels} onChange={handleChange} />
            </div>
            {/* Checklist */}
            <div>
              <label className="mb-2 block text-sm font-medium">Checklist (comma-separated)</label>
              <Textarea rows={3} name="checklist" value={task.checklist} onChange={handleChange} />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditTaskPage;