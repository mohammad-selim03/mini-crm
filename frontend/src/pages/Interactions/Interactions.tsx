import InteractionForm from "./components/InteractionForm";
import InteractionsTable from "./components/InteractionsTable";
import { useInteractions } from "./hooks/useInteractions";

const Interactions = () => {
  const {
    interactions,
    clients,
    projects,
    loading,
    submitting,
    error,
    success,
    editingInteraction,
    formData,
    handleFormDataChange,
    handleSubmit,
    handleDelete,
    handleEdit,
    handleCancel,
  } = useInteractions();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Interaction Logs
      </h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}

      <InteractionForm
        formData={formData}
        clients={clients}
        projects={projects}
        editingInteraction={editingInteraction}
        submitting={submitting}
        onFormDataChange={handleFormDataChange}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />

      <InteractionsTable
        interactions={interactions}
        submitting={submitting}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Interactions;
