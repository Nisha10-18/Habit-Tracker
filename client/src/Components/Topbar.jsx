import { motion } from "framer-motion";

function Topbar({ logout }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-between items-center"
    >
      <h2 className="text-3xl font-bold">Dashboard</h2>

      <button
        onClick={logout}
        className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
      >
        Logout
      </button>
    </motion.div>
  );
}

export default Topbar;