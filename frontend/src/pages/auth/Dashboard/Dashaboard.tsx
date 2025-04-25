import { useEffect, useState } from "react";
import { useTheme } from "../../../context/ThemeContext";
import API from "../../../lib/api";
import { Link } from "react-router-dom";

interface DashboardData {
  totalClients: number;
  totalProjects: number;
  upcomingReminders: Array<{
    id: string;
    dueDate: string;
    notes: string;
    client?: { name: string };
    project?: { title: string };
  }>;
  projectsByStatus: Array<{
    status: string;
    _count: number;
  }>;
}

const Dashboard = () => {
  const { theme, toggleTheme } = useTheme();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await API.get("/dashboard");
        setDashboardData(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500">No data available</div>
      </div>
    );
  }

  return (
    <div className="p-6 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-900 min-h-screen">
      {/* Overview Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <Link
          to={"/clients"}
          className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg shadow"
        >
          <div className="text-sm text-blue-600 dark:text-blue-300">
            Total Clients
          </div>
          <div className="text-2xl font-bold">{dashboardData.totalClients}</div>
        </Link>
        <Link
          to={"/projects"}
          className="bg-green-50 dark:bg-green-900 p-4 rounded-lg shadow"
        >
          <div className="text-sm text-green-600 dark:text-green-300">
            Total Projects
          </div>
          <div className="text-2xl font-bold">
            {dashboardData.totalProjects}
          </div>
        </Link>
        <Link
          to={"/reminders"}
          className="bg-purple-50 dark:bg-purple-900 p-4 rounded-lg shadow"
        >
          <div className="text-sm text-purple-600 dark:text-purple-300">
            Upcoming Reminders
          </div>
          <div className="text-2xl font-bold">
            {dashboardData.upcomingReminders?.length || 0}
          </div>
        </Link>
        <div className="bg-orange-50 dark:bg-orange-900 p-4 rounded-lg shadow">
          <div className="text-sm text-orange-600 dark:text-orange-300">
            Active Projects
          </div>
          <div className="text-2xl font-bold">
            {dashboardData.projectsByStatus?.find((p) => p.status === "active")
              ?._count || 0}
          </div>
        </div>
        <Link
          to={"/interactions"}
          className="bg-lime-50 dark:bg-orange-900 p-4 rounded-lg shadow"
        >
          <div className="text-sm text-black dark:text-orange-300">
            Interactions
          </div>
          <div className="text-2xl font-bold">
            {dashboardData.projectsByStatus?.find((p) => p.status === "active")
              ?._count || 0}
          </div>
        </Link>
      </div>

      {/* Projects by Status */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Projects by Status</h2>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {dashboardData?.projectsByStatus?.map((status) => {
            console.log("status", status)
            // Define status-specific styles
            const getStatusStyles = (statusType: string) => {
              switch (statusType) {
                case "completed":
                  return "bg-green-50 dark:bg-green-900 text-green-600 dark:text-green-300";
                case "pending":
                  return "bg-yellow-50 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300";
                case "in_progress":
                  return "bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300";
                default:
                  return "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300";
              }
            };

            const statusStyle = getStatusStyles(status.status);

            return (
              <div
                key={status.status}
                className={`p-4 rounded-lg shadow transition-all duration-200 hover:shadow-md ${statusStyle}`}
              >
                <div className="text-sm capitalize mb-2">
                  {status.status.replace("_", " ")}
                </div>
                <div className="text-xl font-bold">{status._count}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Upcoming Reminders */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Upcoming Reminders</h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Notes
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Related To
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {dashboardData.upcomingReminders?.map((reminder) => (
                <tr key={reminder.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {new Date(reminder.dueDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {reminder.notes}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {reminder.client?.name || reminder.project?.title || "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
