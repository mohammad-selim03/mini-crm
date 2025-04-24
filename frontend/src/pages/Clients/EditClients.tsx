import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useNavigate } from "react-router-dom";
import { useClients } from "../../hooks/useClients";
import { useEffect } from "react";

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(7),
  company: z.string().optional(),
  notes: z.string().optional(),
});

type ClientForm = z.infer<typeof schema>;

export default function EditClientPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: clients, updateClient } = useClients();
  const client = clients?.find((c) => c.id === id);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ClientForm>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (client) {
      reset({
        name: client.name,
        email: client.email,
        phone: client.phone,
        company: client.company,
        notes: client.notes,
      });
    }
  }, [client, reset]);

  const onSubmit = async (data: ClientForm) => {
    if (!id) return;
    try {
      await updateClient.mutateAsync({ id, client: data });
      navigate("/clients");
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  if (!client) return <p className="p-6">Loading client...</p>;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Client</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-medium">Name</label>
          <input className="input" {...register("name")} />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block font-medium">Email</label>
          <input className="input" type="email" {...register("email")} />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">Phone</label>
          <input className="input" type="tel" {...register("phone")} />
          {errors.phone && (
            <p className="text-red-500">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">Company</label>
          <input className="input" {...register("company")} />
        </div>

        <div>
          <label className="block font-medium">Notes</label>
          <textarea className="input" rows={3} {...register("notes")} />
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Updating..." : "Update Client"}
        </button>
      </form>
    </div>
  );
}
