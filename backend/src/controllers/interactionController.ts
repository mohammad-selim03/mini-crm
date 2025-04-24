import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { Request as AuthRequest } from "../middlewares/auth";

const prisma = new PrismaClient();

// Create interaction log
export const createInteraction = async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { date, type, notes, clientId, projectId } = req.body;

  try {
    const interaction = await prisma.interactionLog.create({
      data: {
        date: new Date(date),
        type,
        notes,
        userId: req.user.id,
        ...(clientId && { clientId }),
        ...(projectId && { projectId }),
      },
    });
    return res.status(201).json(interaction);
  } catch (error) {
    console.error("Error creating interaction:", error);
    return res.status(500).json({
      message: "Error creating interaction log",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Get all interactions
export const getInteractions = async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const interactions = await prisma.interactionLog.findMany({
      where: { userId: req.user.id },
      include: {
        client: true,
        project: true,
      },
      orderBy: { date: "desc" },
    });
    return res.json(interactions);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching interactions" });
  }
};

// Update interaction
export const updateInteraction = async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { id } = req.params;
  const { date, type, notes, clientId, projectId } = req.body;

  try {
    const updatedInteraction = await prisma.interactionLog.update({
      where: { id },
      data: {
        date: new Date(date),
        type,
        notes,
        clientId,
        projectId,
      },
    });
    return res.json(updatedInteraction);
  } catch (error) {
    return res.status(500).json({ message: "Error updating interaction" });
  }
};

// Delete interaction
export const deleteInteraction = async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { id } = req.params;

  try {
    await prisma.interactionLog.delete({
      where: { id },
    });
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: "Error deleting interaction" });
  }
};
