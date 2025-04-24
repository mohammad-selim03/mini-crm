import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { Request as AuthRequest } from "../middlewares/auth";

const prisma = new PrismaClient();

// Create Project
export const createProject = async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { title, budget, deadline, status, clientId } = req.body;

  try {
    const project = await prisma.project.create({
      data: {
        title,
        budget,
        deadline: new Date(deadline),
        status,
        clientId,
        userId: req.user.id,
      },
      include: {
        client: true,
      },
    });
    return res.status(201).json(project);
  } catch (error) {
    console.error("Error creating project:", error);
    return res.status(500).json({
      message: "Error creating project",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Get all projects
export const getProjects = async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const projects = await prisma.project.findMany({
      where: { userId: req.user.id },
      include: {
        client: true,
      },
      orderBy: {
        deadline: "desc",
      },
    });
    return res.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return res.status(500).json({
      message: "Error fetching projects",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Get single project
export const getProject = async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { id } = req.params;

  try {
    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        client: true,
      },
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.userId !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    return res.json(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    return res.status(500).json({
      message: "Error fetching project",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Update Project
export const updateProject = async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { id } = req.params;
  const { title, budget, deadline, status, clientId } = req.body;

  try {
    const updatedProject = await prisma.project.update({
      where: { id },
      data: {
        title,
        budget,
        deadline: new Date(deadline),
        status,
        ...(clientId && { clientId }),
      },
      include: {
        client: true,
      },
    });
    return res.json(updatedProject);
  } catch (error) {
    console.error("Error updating project:", error);
    return res.status(500).json({
      message: "Error updating project",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Delete Project
export const deleteProject = async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { id } = req.params;

  try {
    await prisma.project.delete({
      where: { id },
    });
    return res.status(204).send();
  } catch (error) {
    console.error("Error deleting project:", error);
    return res.status(500).json({
      message: "Error deleting project",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
