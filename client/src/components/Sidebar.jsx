import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  timeFrame,
  setTimeFrame,
  minMag,
  setMinMag,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  fetchEarthquakes,
}) {
  return (
    <>
      {/* Sidebar */}
      <motion.div
        initial={{ x: -250 }}
        animate={{ x: sidebarOpen ? 0 : -250 }}
        transition={{ duration: 0.3 }}
        className="absolute top-0 left-0 h-full w-64 backdrop-blur-md bg-gray-900/40 text-white shadow-lg p-5 z-1000 flex flex-col justify-between"
      >
        <div>
          <h2 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">
            Filters
          </h2>

          {/* Time Range */}
          <label className="text-sm font-medium">Time Range</label>
          <select
            value={timeFrame}
            onChange={(e) => setTimeFrame(e.target.value)}
            className="w-full bg-gray-800/60 text-white rounded-md mt-1 p-2 text-sm focus:outline-none"
          >
            <option value="all_hour">Past Hour</option>
            <option value="all_day">Past Day</option>
            <option value="all_week">Past Week</option>
            <option value="all_month">Past Month</option>
          </select>

          {/* Magnitude */}
          <label className="text-sm font-medium mt-4">Min Magnitude</label>
          <select
            value={minMag}
            onChange={(e) => setMinMag(Number(e.target.value))}
            className="w-full bg-gray-800/60 text-white rounded-md mt-1 p-2 text-sm focus:outline-none"
          >
            <option value={0}>All</option>
            <option value={2.5}>2.5+</option>
            <option value={4.5}>4.5+</option>
            <option value={6}>6.0+</option>
          </select>

          {/* Custom Date */}
          <label className="text-sm font-medium mt-4">Custom Date Range</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full bg-gray-800/60 text-white rounded-md mt-1 p-2 text-sm"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full bg-gray-800/60 text-white rounded-md mt-2 p-2 text-sm"
          />

          {/* Refresh */}
          <button
            onClick={fetchEarthquakes}
            className="mt-5 bg-blue-600/80 hover:bg-blue-700 text-white rounded-md py-2 text-sm w-full transition"
          >
            Refresh
          </button>
        </div>

        <p className="text-xs text-center mt-6">
          Auto-refreshes every 5 min
        </p>
      </motion.div>

      {/* Sidebar Toggle Button */}
      <motion.button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        animate={{
          x: sidebarOpen ? 256 : 0, // move with sidebar (64 * 4 = 256px)
        }}
        transition={{ duration: 0.3 }}
        className="absolute top-5 z-1100 bg-gray-900/60 backdrop-blur-lg text-white p-2 rounded-r-lg shadow-md hover:bg-gray-800/80 transition"
      >
        {sidebarOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
      </motion.button>
    </>
  );
}