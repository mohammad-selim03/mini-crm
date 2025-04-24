import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { Request as AuthRequest } from "../middlewares/auth";

const prisma = new PrismaClient();

// Create reminder
export const createReminder = async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { dueDate, notes, clientId, projectId } = req.body;

  try {
    const reminder = await prisma.reminder.create({
      data: {
        dueDate: new Date(dueDate),
        notes,
        userId: req.user.id,
        ...(clientId && { clientId }),
        ...(projectId && { projectId }),
      },
    });
    return res.status(201).json(reminder);
  } catch (error) {
    console.error("Error creating reminder:", error);
    return res.status(500).json({
      message: "Error creating reminder",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Get all reminders
export const getReminders = async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const reminders = await prisma.reminder.findMany({
      where: { userId: req.user.id },
      include: {
        client: true,
        project: true,
      },
      orderBy: { dueDate: "asc" },
    });
    return res.json(reminders);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching reminders" });
  }
};

// Get upcoming reminders (this week)
export const getUpcomingReminders = async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const today = new Date();
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);

  try {
    const reminders = await prisma.reminder.findMany({
      where: {
        userId: req.user.id,
        dueDate: {
          gte: today,
          lte: nextWeek,
        },
      },
      include: {
        client: true,
        project: true,
      },
      orderBy: { dueDate: "asc" },
    });
    return res.json(reminders);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching upcoming reminders" });
  }
};

// Update reminder
export const updateReminder = async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { id } = req.params;
  const { dueDate, notes, clientId, projectId } = req.body;

  try {
    const updatedReminder = await prisma.reminder.update({
      where: { id },
      data: {
        dueDate: new Date(dueDate),
        notes,
        ...(clientId && { clientId }),
        ...(projectId && { projectId }),
      },
    });
    return res.json(updatedReminder);
  } catch (error) {
    console.error("Error updating reminder:", error);
    return res.status(500).json({
      message: "Error updating reminder",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Delete reminder
export const deleteReminder = async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { id } = req.params;

  try {
    await prisma.reminder.delete({
      where: { id },
    });
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: "Error deleting reminder" });
  }
};
