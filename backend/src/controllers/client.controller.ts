import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const getClients = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const clients = await prisma.client.findMany({ where: { userId } });
  res.json(clients);
};

export const createClient = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const { name, email, phone, company, notes } = req.body;
  const client = await prisma.client.create({
    data: { name, email, phone, company, notes, userId },
  });
  res.status(201).json(client);
};

export const getClient = async (req: Request, res: Response) => {
  const { id } = req.params;
  const client = await prisma.client.findFirst({
    where: { id, userId: req.user!.id },
  });
  if (!client) return res.status(404).json({ message: 'Client not found' });
  res.json(client);
};

export const updateClient = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  const updated = await prisma.client.updateMany({
    where: { id, userId: req.user!.id },
    data,
  });
  if (updated.count === 0) {
    return res
      .status(404)
      .json({ message: 'Client not found or unauthorized' });
  }
  res.json({ message: 'Client updated' });
};

export const deleteClient = async (req: Request, res: Response) => {
  const { id } = req.params;
  const deleted = await prisma.client.deleteMany({
    where: { id, userId: req.user!.id },
  });
  if (deleted.count === 0) {
    return res
      .status(404)
      .json({ message: 'Client not found or unauthorized' });
  }
  res.json({ message: 'Client deleted' });
};
