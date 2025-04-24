import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useClients } from "../../hooks/useClients";
import { useNavigate } from "react-router-dom";

const clientSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email(),
  phone: z.string().min(7, "Phone is too short"),
  company: z.string().optional(),
  notes: z.string().optional(),
});

type ClientForm = z.infer<typeof clientSchema>;

export default function NewClientPage() {
  const { createClient } = useClients();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ClientForm>({
    resolver: zodResolver(clientSchema),
  });

  const onSubmit = async (data: ClientForm) => {
    try {
      await createClient.mutateAsync(data);
      navigate("/clients");
    } catch (err: any) {
      console.error("Failed to create client", err);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">New Client</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-medium">Name</label>
          <input type="text" {...register("name")} className="input w-full" />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">Email</label>
          <input type="email" {...register("email")} className="input w-full" />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">Phone</label>
          <input type="tel" {...register("phone")} className="input w-full" />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">Company</label>
          <input
            type="text"
            {...register("company")}
            className="input w-full"
          />
        </div>

        <div>
          <label className="block font-medium">Notes</label>
          <textarea rows={3} {...register("notes")} className="input w-full" />
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Create Client"}
        </button>
      </form>
    </div>
  );
}
