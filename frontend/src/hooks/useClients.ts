import api from "../lib/axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Client } from "../types/client";

export const useClients = () => {
  const queryClient = useQueryClient();

  const fetchClients = () =>
    api.get<Client[]>("/clients").then((res) => res.data);

  const createClient = useMutation({
    mutationFn: (client: Omit<Client, "id" | "createdAt">) =>
      api.post("/clients", client),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["clients"] }),
  });

  const updateClient = useMutation({
    mutationFn: (data: { id: string; client: Partial<Client> }) =>
      api.put(`/clients/${data.id}`, data.client),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["clients"] }),
  });

  const deleteClient = useMutation({
    mutationFn: (id: string) => api.delete(`/clients/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["clients"] }),
  });

  const clientsQuery = useQuery({
    queryKey: ["clients"],
    queryFn: fetchClients,
  });

  return {
    ...clientsQuery,
    createClient,
    updateClient,
    deleteClient,
  };
};
