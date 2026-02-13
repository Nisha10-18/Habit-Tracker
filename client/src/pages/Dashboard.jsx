import { useEffect, useState } from "react";
import axios from "../axiosConfig";
import { useNavigate, Link } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { LayoutDashboard, BarChart2, History } from "lucide-react";
import { motion } from "framer-motion";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { subDays } from "date-fns";
import Confetti from "react-confetti";

function Dashboard() {
  const [habits, setHabits] = useState([]);
  const [title, setTitle] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [dark, setDark] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  const fetchHabits = async () => {
    try {
      const res = await axios.get("/habits");
      setHabits(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  const addHabit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    await axios.post("/habits", { title, frequency: "daily" });
    setTitle("");
    fetchHabits();
  };

  const completeHabit = async (id) => {
    await axios.put(`/habits/${id}/complete`);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
    fetchHabits();
  };

  const deleteHabit = async (id) => {
    await axios.delete(`/habits/${id}`);
    fetchHabits();
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const totalHabits = habits.length;
  const totalCompleted = habits.reduce(
    (sum, h) => sum + (h.completedDates?.length || 0),
    0
  );

  const chartData = habits.map((h) => ({
    name: h.title,
    completions: h.completedDates?.length || 0,
  }));

  const heatmapDates = habits
    .flatMap((h) => h.completedDates || [])
    .map((d) => ({
      date: new Date(d).toISOString().split("T")[0],
      count: 1,
    }));

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-black via-indigo-950 to-purple-950 text-white relative overflow-hidden">

      {showConfetti && <Confetti />}

      <div className="w-64 bg-white/5 backdrop-blur-xl border-r border-white/10 p-6 hidden md:block">
        <h1 className="text-2xl font-bold mb-10 text-purple-400">
          HabitForge
        </h1>

        <nav className="space-y-6">
          <Link to="/" className="flex items-center gap-3 hover:text-purple-400">
            <LayoutDashboard size={20} /> Dashboard
          </Link>

          <Link to="/analytics" className="flex items-center gap-3 hover:text-purple-400">
            <BarChart2 size={20} /> Analytics
          </Link>

          <Link to="/history" className="flex items-center gap-3 hover:text-purple-400">
            <History size={20} /> History
          </Link>
        </nav>
      </div>

      <div className="flex-1 p-8 space-y-8">

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center"
        >
          <h2 className="text-3xl font-bold">Dashboard</h2>

          <div className="flex gap-3">
            <button
              onClick={() => setDark(!dark)}
              className="bg-purple-600 px-3 py-1 rounded"
            >
              {dark ? "Light" : "Dark"}
            </button>

            <button
              onClick={logout}
              className="bg-red-500 px-4 py-2 rounded-lg"
            >
              Logout
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StatCard title="Total Habits" value={totalHabits} />
          <StatCard title="Total Completions" value={totalCompleted} />
        </div>

        <div className="bg-white/10 p-6 rounded-2xl h-80">
          <h3 className="mb-4 font-semibold">Habit Performance</h3>

          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis dataKey="name" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="completions"
                stroke="#a855f7"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white/10 p-6 rounded-2xl">
          <h3 className="mb-4 font-semibold">Daily Activity</h3>

          <CalendarHeatmap
            startDate={subDays(new Date(), 90)}
            endDate={new Date()}
            values={heatmapDates}
          />
        </div>

        <div className="bg-white/10 p-6 rounded-2xl">
          <h3 className="mb-4 font-semibold">Your Habits</h3>

          {/* ✅ UPDATED INPUT ONLY */}
          <form onSubmit={addHabit} className="flex gap-3 mb-6">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter new habit"
              className="flex-1 p-3 rounded-lg 
                         bg-white 
                         text-black 
                         placeholder-gray-400
                         focus:outline-none 
                         focus:ring-2 
                         focus:ring-purple-500"
            />
            <button className="bg-purple-600 px-4 py-2 rounded-lg">
              Add
            </button>
          </form>

          <ul className="space-y-4">
            {habits.map((habit) => (
              <li
                key={habit._id}
                className="bg-white/5 p-4 rounded-xl flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">{habit.title}</p>
                  <p className="text-sm opacity-70">
                    Completed: {habit.completedDates?.length || 0}
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => completeHabit(habit._id)}
                    className="bg-green-500 px-3 py-1 rounded"
                  >
                    Complete
                  </button>

                  <button
                    onClick={() => deleteHabit(habit._id)}
                    className="bg-red-500 px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>

        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white/10 p-6 rounded-2xl">
      <p className="text-sm opacity-70">{title}</p>
      <h2 className="text-3xl font-bold mt-2 text-purple-400">
        {value}
      </h2>
    </div>
  );
}

export default Dashboard;