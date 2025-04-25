import { useState, useEffect } from "react";
import { AxiosError } from "axios";
import API from "../../../lib/api";
import { Interaction, Client, Project, ErrorResponse } from "../types";

export const useInteractions = () => {
  const [interactions, setInteractions] = useState<Interaction[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [editingInteraction, setEditingInteraction] =
    useState<Interaction | null>(null);
  const [formData, setFormData] = useState({
    date: "",
    type: "",
    notes: "",
    clientId: "",
    projectId: "",
  });

  useEffect(() => {
    fetchInteractions();
    fetchClients();
    fetchProjects();
  }, []);

  const fetchInteractions = async () => {
    try {
      setLoading(true);
      const response = await API.get("/interactions");
      setInteractions(response.data);
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ErrorResponse>;
      setError(
        axiosError.response?.data?.message || "Failed to load interactions"
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchClients = async () => {
    try {
      const response = await API.get("/clients");
      setClients(response.data);
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ErrorResponse>;
      setError(axiosError.response?.data?.message || "Failed to load clients");
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await API.get("/projects");
      setProjects(response.data);
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ErrorResponse>;
      setError(axiosError.response?.data?.message || "Failed to load projects");
    }
  };

  const handleFormDataChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const submitData = {
        ...formData,
        date: new Date(formData.date).toISOString(),
      };

      if (editingInteraction) {
        await API.put(`/interactions/${editingInteraction.id}`, submitData);
        setEditingInteraction(null);
        setSuccess("Interaction updated successfully");
      } else {
        await API.post("/interactions", submitData);
        setSuccess("Interaction created successfully");
      }
      setFormData({
        date: "",
        type: "",
        notes: "",
        clientId: "",
        projectId: "",
      });
      fetchInteractions();
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ErrorResponse>;
      setError(
        axiosError.response?.data?.message || "Failed to save interaction"
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (interactionId: string) => {
    if (window.confirm("Are you sure you want to delete this interaction?")) {
      try {
        setSubmitting(true);
        await API.delete(`/interactions/${interactionId}`);
        setInteractions(
          interactions.filter((interaction) => interaction.id !== interactionId)
        );
        setSuccess("Interaction deleted successfully");
      } catch (error: unknown) {
        const axiosError = error as AxiosError<ErrorResponse>;
        setError(
          axiosError.response?.data?.message || "Failed to delete interaction"
        );
      } finally {
        setSubmitting(false);
      }
    }
  };

  const handleEdit = (interaction: Interaction) => {
    const formattedDate = new Date(interaction.date).toISOString().slice(0, 16);
    setEditingInteraction(interaction);
    setFormData({
      date: formattedDate,
      type: interaction.type,
      notes: interaction.notes,
      clientId: interaction.client?.id || "",
      projectId: interaction.project?.id || "",
    });
  };

  const handleCancel = () => {
    setEditingInteraction(null);
    setFormData({
      date: "",
      type: "",
      notes: "",
      clientId: "",
      projectId: "",
    });
  };

  return {
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
  };
};
