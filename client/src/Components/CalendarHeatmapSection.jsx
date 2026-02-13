import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { subDays } from "date-fns";

function CalendarHeatmapSection({ habits }) {
  const allDates = habits.flatMap((h) => h.completedDates || []);

  const values = allDates.map((date) => ({
    date: new Date(date).toISOString().split("T")[0],
    count: 1,
  }));

  return (
    <div className="bg-white/10 p-6 rounded-xl">
      <h3 className="mb-4 text-lg font-semibold">Daily Activity</h3>

      <CalendarHeatmap
        startDate={subDays(new Date(), 90)}
        endDate={new Date()}
        values={values}
        classForValue={(value) => {
          if (!value) return "color-empty";
          return "color-github-3";
        }}
      />
    </div>
  );
}

export default CalendarHeatmapSection;