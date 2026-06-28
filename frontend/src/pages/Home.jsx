import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar as CalendarIcon } from "lucide-react";

import { useAuth } from "../AuthContext.jsx";
import Navbar from "../components/Navbar";
import Dashboard from "../components/Dashboard";
import StatsSection from "../components/StatsSection";
import { Button } from "../components/ui/Button";

import api from "../utils/api";
import {
  DAILY_STATS,
  GET_ALL_TASKS,
  DELETE_TASK,
  DRAG_AND_DROP_TASK,
} from "../utils/API_Paths";
import DashboardSkeleton from "../components/DashboardSkeleton.jsx";
import InteractiveDailyPlanner from "../components/InteractiveDailyPlanner.jsx";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Default to today's date
  const today = new Date().toISOString().split("T")[0];

  const [selectedDate, setSelectedDate] = useState(today);
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const fetchData = async (date = selectedDate) => {
    try {
      setLoading(true);

      const [taskRes, statsRes] = await Promise.all([
        api.get(GET_ALL_TASKS, {
          params: {
            date,
          },
        }),

        api.get(DAILY_STATS, {
          params: {
            date,
          },
        }),
      ]);

      setTasks(taskRes.data.tasks || []);
      setStats(statsRes.data.stats || null);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  };

  useEffect(() => {
    fetchData(selectedDate);
  }, [selectedDate]);

  const handleDelete = async (slug) => {
    try {
      await api.delete(DELETE_TASK(slug));

      setTasks((prev) => prev.filter((task) => task.slug !== slug));
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (slug) => {
    navigate(`/edit-task/${slug}`);
  };

  const getTask = (slug) => {
    navigate(`/view-task/${slug}`);
  };

  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const task = tasks.find((t) => t._id === draggableId);

    if (!task) return;

    const previousTasks = [...tasks];

    const newStatus = destination.droppableId;

    setTasks((prev) =>
      prev.map((task) =>
        task._id === draggableId
          ? {
              ...task,
              status: newStatus,
            }
          : task
      )
    );

    try {
      await api.patch(DRAG_AND_DROP_TASK(task.slug), {
        status: newStatus,
      });
    } catch (error) {
      console.error("Failed to update task status:", error);
      setTasks(previousTasks);
    }
  };

  if (initialLoading) {
    return <DashboardSkeleton isInitialLoad={true} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <section className="mx-auto max-w-7xl px-4 py-6">
        <div className="mb-6">
          <InteractiveDailyPlanner value={selectedDate} onChange={setSelectedDate} />
        </div>

        {loading ? (
          <DashboardSkeleton isInitialLoad={false} />
        ) : (
          <>
            <div className="mb-8">
              <StatsSection stats={stats} />
            </div>
            {tasks.length === 0 ? (
              <div className="mt-20 flex flex-col items-center text-center">
                <CalendarIcon className="h-16 w-16 text-gray-400" />
                <h2 className="mt-4 text-2xl font-semibold text-gray-800">
                  No tasks for this day
                </h2>
                <p className="mt-2 text-gray-500">
                  Ready to get productive? Create your first task!
                </p>
              </div>
            ) : (
              <Dashboard
                tasks={tasks}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onClick={getTask}
                onDragEnd={onDragEnd}
              />
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default Home;