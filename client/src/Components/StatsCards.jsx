function StatsCards({ habits }) {
  const total = habits.length;

  const totalCompleted = habits.reduce(
    (sum, habit) => sum + (habit.completedDates?.length || 0),
    0
  );

  const avg = total ? Math.round(totalCompleted / total) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card title="Total Habits" value={total} />
      <Card title="Total Completions" value={totalCompleted} />
      <Card title="Average Completion" value={avg} />
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:scale-105 transition duration-300">
      <p className="text-sm opacity-70">{title}</p>
      <h2 className="text-3xl font-bold mt-2 text-purple-400">
        {value}
      </h2>
    </div>
  );
}

export default StatsCards;