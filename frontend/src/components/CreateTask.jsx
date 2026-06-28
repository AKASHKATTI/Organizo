import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/Button";

import { CREATE_TASK } from "../utils/API_Paths";

const CreateTask = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "medium",
    status: "todo",
    taskDate: new Date().toISOString().split("T")[0],
    estimatedMinutes: "",
    labels: "",
    checklist: "",
  });

  const handleChange = (e) => {
    setTask((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const resetForm = () => {
    setTask({
      title: "",
      description: "",
      priority: "medium",
      status: "todo",
      taskDate: new Date().toISOString().split("T")[0],
      estimatedMinutes: "",
      labels: "",
      checklist: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const payload = {
        ...task,

        estimatedMinutes: Number(task.estimatedMinutes),

        labels: task.labels
          .split(",")
          .map((label) => label.trim())
          .filter(Boolean),

        checklist: task.checklist
          .split(",")
          .map((item) => ({
            text: item.trim(),
          }))
          .filter((item) => item.text),
      };

      const { data } = await axios.post(
        CREATE_TASK,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(data);

      alert("Task created successfully!");

      resetForm();

      navigate("/");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message || "Unable to create task."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold text-gray-800">
        Create New Task
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Title */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            Title
          </label>

          <Input
            name="title"
            placeholder="Read Atomic Habits"
            value={task.title}
            onChange={handleChange}
            required
          />
        </div>

        {/* Description */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            Description
          </label>

          <Textarea
            rows={4}
            name="description"
            placeholder="Task description..."
            value={task.description}
            onChange={handleChange}
          />
        </div>

        {/* Priority & Status */}

        <div className="grid gap-5 md:grid-cols-2">

          <div>
            <label className="mb-2 block text-sm font-medium">
              Priority
            </label>

            <select
              name="priority"
              value={task.priority}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 p-2"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Status
            </label>

            <select
              name="status"
              value={task.status}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 p-2"
            >
              <option value="todo">Todo</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

        </div>

        {/* Date & Estimated Minutes */}

        <div className="grid gap-5 md:grid-cols-2">

          <div>
            <label className="mb-2 block text-sm font-medium">
              Task Date
            </label>

            <Input
              type="date"
              name="taskDate"
              value={task.taskDate}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Estimated Minutes
            </label>

            <Input
              type="number"
              name="estimatedMinutes"
              placeholder="30"
              value={task.estimatedMinutes}
              onChange={handleChange}
            />
          </div>

        </div>

        {/* Labels */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            Labels
          </label>

          <Input
            name="labels"
            placeholder="books,self-improvement"
            value={task.labels}
            onChange={handleChange}
          />
        </div>

        {/* Checklist */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            Checklist
          </label>

          <Textarea
            rows={3}
            name="checklist"
            placeholder="Read chapter 1, Take notes"
            value={task.checklist}
            onChange={handleChange}
          />
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Task"}
        </Button>

      </form>
    </div>
  );
};

export default CreateTask;