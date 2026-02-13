import axios from "../axiosConfig";
import { useEffect, useState } from "react";

function History() {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    axios.get("/habits").then((res) => {
      setHabits(res.data);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-indigo-950 to-purple-950 text-white p-10">
      <h1 className="text-3xl font-bold mb-8">History</h1>

      <div className="space-y-4">
        {habits.map((habit) => (
          <div
            key={habit._id}
            className="bg-white/10 p-4 rounded-xl"
          >
            <p className="font-semibold">{habit.title}</p>
            <p className="text-sm opacity-70">
              Total Completed: {habit.completedDates?.length || 0}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default History;