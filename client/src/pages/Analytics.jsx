import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "../axiosConfig";
import { useEffect, useState } from "react";

function Analytics() {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    axios.get("/habits").then((res) => {
      setHabits(res.data);
    });
  }, []);

  const data = habits.map((habit) => ({
    name: habit.title,
    completions: habit.completedDates?.length || 0,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-indigo-950 to-purple-950 text-white p-10">
      <h1 className="text-3xl font-bold mb-8">Analytics</h1>

      <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-6 h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
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
    </div>
  );
}

export default Analytics;