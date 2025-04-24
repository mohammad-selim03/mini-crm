import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { Request as AuthRequest } from "../middlewares/auth";

const prisma = new PrismaClient();

export const getDashboardData = async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const [totalClients, totalProjects, upcomingReminders, projectsByStatus] =
      await Promise.all([
        // Total clients
        prisma.client.count({
          where: { userId: req.user.id },
        }),
        // Total projects
        prisma.project.count({
          where: { userId: req.user.id },
        }),
        // Upcoming reminders (next 7 days)
        prisma.reminder.findMany({
          where: {
            userId: req.user.id,
            dueDate: {
              gte: new Date(),
              lte: new Date(new Date().setDate(new Date().getDate() + 7)),
            },
          },
          include: {
            client: true,
            project: true,
          },
          orderBy: { dueDate: "asc" },
        }),
        // Projects by status
        prisma.project.groupBy({
          by: ["status"],
          where: { userId: req.user.id },
          _count: true,
        }),
      ]);

    return res.json({
      totalClients,
      totalProjects,
      upcomingReminders,
      projectsByStatus,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching dashboard data" });
  }
};
