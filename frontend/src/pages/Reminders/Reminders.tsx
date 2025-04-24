import { useEffect, useState } from "react";
import API from "../../lib/api";
import { AxiosError } from "axios";

interface Reminder {
  id: string;
  dueDate: string;
  notes: string;
  client?: { name: string };
  project?: { title: string };
}

interface ErrorResponse {
  message: string;
}

const Reminders = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingReminder, setEditingReminder] = useState<Reminder | null>(null);
  const [formData, setFormData] = useState({
    dueDate: "",
    notes: "",
    clientId: "",
    projectId: "",
  });

  useEffect(() => {
    fetchReminders();
  }, []);

  const fetchReminders = async () => {
    try {
      const response = await API.get("/reminders");
      setReminders(response.data);
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ErrorResponse>;
      setError(
        axiosError.response?.data?.message || "Failed to load reminders"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const submitData = {
        ...formData,
        dueDate: new Date(formData.dueDate).toISOString(),
      };

      if (editingReminder) {
        await API.put(`/reminders/${editingReminder.id}`, submitData);
        setEditingReminder(null);
      } else {
        await API.post("/reminders", submitData);
      }
      setFormData({
        dueDate: "",
        notes: "",
        clientId: "",
        projectId: "",
      });
      fetchReminders();
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ErrorResponse>;
      setError(axiosError.response?.data?.message || "Failed to save reminder");
    }
  };

  const handleDelete = async (reminderId: string) => {
    if (window.confirm("Are you sure you want to delete this reminder?")) {
      try {
        await API.delete(`/reminders/${reminderId}`);
        setReminders(
          reminders.filter((reminder) => reminder.id !== reminderId)
        );
      } catch (error: unknown) {
        const axiosError = error as AxiosError<ErrorResponse>;
        setError(
          axiosError.response?.data?.message || "Failed to delete reminder"
        );
      }
    }
  };

  const handleEdit = (reminder: Reminder) => {
    // Format the date for the datetime-local input
    const formattedDate = new Date(reminder.dueDate).toISOString().slice(0, 16); // Format: YYYY-MM-DDThh:mm

    setEditingReminder(reminder);
    setFormData({
      dueDate: formattedDate,
      notes: reminder.notes,
      clientId: "",
      projectId: "",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Reminders</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Add/Edit Reminder Form */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">
          {editingReminder ? "Edit Reminder" : "Add New Reminder"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Due Date
              </label>
              <input
                type="datetime-local"
                value={formData.dueDate}
                onChange={(e) =>
                  setFormData({ ...formData, dueDate: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700"
              rows={3}
              required
            />
          </div>
          <div className="flex justify-end space-x-4">
            {editingReminder && (
              <button
                type="button"
                onClick={() => {
                  setEditingReminder(null);
                  setFormData({
                    dueDate: "",
                    notes: "",
                    clientId: "",
                    projectId: "",
                  });
                }}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {editingReminder ? "Update Reminder" : "Add Reminder"}
            </button>
          </div>
        </form>
      </div>

      {/* Reminders Table */}
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {reminders.map((reminder) => {
              const dueDate = new Date(reminder.dueDate);
              const now = new Date();
              const isOverdue = dueDate < now;
              const isDueSoon =
                !isOverdue &&
                dueDate.getTime() - now.getTime() < 24 * 60 * 60 * 1000;

              return (
                <tr key={reminder.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {dueDate.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                    {reminder.notes}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {reminder.client?.name || reminder.project?.title || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        isOverdue
                          ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                          : isDueSoon
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                          : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      }`}
                    >
                      {isOverdue
                        ? "Overdue"
                        : isDueSoon
                        ? "Due Soon"
                        : "Upcoming"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEdit(reminder)}
                      className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(reminder.id)}
                      className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reminders;
