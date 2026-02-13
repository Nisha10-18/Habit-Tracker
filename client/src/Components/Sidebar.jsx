import { LayoutDashboard, BarChart2, History } from "lucide-react";

function Sidebar() {
  return (
    <div className="w-64 bg-white/5 backdrop-blur-xl border-r border-white/10 p-6 hidden md:block">
      <h1 className="text-2xl font-bold mb-10 text-purple-400">
        HabitForge
      </h1>

      <nav className="space-y-6">
        <div className="flex items-center gap-3 hover:text-purple-400 cursor-pointer">
          <LayoutDashboard size={20} />
          Dashboard
        </div>

        <div className="flex items-center gap-3 hover:text-purple-400 cursor-pointer">
          <BarChart2 size={20} />
          Analytics
        </div>

        <div className="flex items-center gap-3 hover:text-purple-400 cursor-pointer">
          <History size={20} />
          History
        </div>
      </nav>
    </div>
  );
}

export default Sidebar;