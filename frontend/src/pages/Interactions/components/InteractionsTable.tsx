import { Interaction } from "../types";

interface InteractionsTableProps {
  interactions: Interaction[];
  submitting: boolean;
  onEdit: (interaction: Interaction) => void;
  onDelete: (interactionId: string) => void;
}

const InteractionsTable = ({
  interactions,
  submitting,
  onEdit,
  onDelete,
}: InteractionsTableProps) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Notes
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Related To
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {interactions.map((interaction) => (
            <tr
              key={interaction.id}
              className="hover:bg-gray-50 transition-colors"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {new Date(interaction.date).toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                {interaction.type}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {interaction.notes}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {interaction.client?.name ||
                  interaction.project?.title ||
                  "N/A"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => onEdit(interaction)}
                  className="text-blue-600 hover:text-blue-900 mr-4 transition-colors"
                  disabled={submitting}
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(interaction.id)}
                  className="text-red-600 hover:text-red-900 transition-colors"
                  disabled={submitting}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InteractionsTable;
