import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import clientRoutes from "./routes/client.routes";
import projectRoutes from "./routes/projectRoutes";
import interactionRoutes from "./routes/interactionRoutes";
import reminderRoutes from "./routes/reminderRoutes";
import dashboardRoutes from "./routes/dashboardRoutes";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/interactions", interactionRoutes);
app.use("/api/reminders", reminderRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.get("/", (_req: Request, res: Response) => {
  res.send("Mini CRM API Running ✅");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
