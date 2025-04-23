// import { useAuth } from "../../../context/AuthContext";
import { useTheme } from "../../../context/ThemeContext";

const Dashboard = () => {
//   const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="p-6 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-900 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow">
          📁 Projects
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow">
          👥 Clients
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow">
          📝 Reminders
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow">
          📊 Status Chart
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
