import { useClients } from "../../hooks/useClients";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Client } from "../../types/client";
import DeleteClientModal from "../../components/DeleteClientModal";

export default function ClientsPage() {
  const { data, isLoading, refetch } = useClients();
  const navigate = useNavigate();
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const handleDelete = async () => {
    if (!selectedClient) return;
    try {
      await fetch(
        `${import.meta.env.VITE_API_URL}/clients/${selectedClient.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setSelectedClient(null);
      refetch?.();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Clients</h1>
        <button onClick={() => navigate("/clients/new")}>+ Add Client</button>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : data?.length === 0 ? (
        <p>No clients found.</p>
      ) : (
        <div className="grid gap-4">
          {data?.map((client) => (
            <div
              key={client.id}
              className="bg-white dark:bg-gray-800 p-4 rounded shadow"
            >
              <h2 className="font-semibold text-lg">{client.name}</h2>
              <p>
                {client.email} | {client.phone}
              </p>
              <p className="text-sm text-gray-500">{client.company}</p>
              <div className="mt-2 flex gap-2">
                <button onClick={() => navigate(`/clients/edit/${client.id}`)}>
                  Edit
                </button>
                <button onClick={() => setSelectedClient(client)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <DeleteClientModal
        isOpen={!!selectedClient}
        onClose={() => setSelectedClient(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
