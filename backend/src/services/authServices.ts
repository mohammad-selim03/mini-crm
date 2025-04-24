import bcrypt from "bcrypt";
import prisma from "../prisma";
import { generateToken } from "../utils/jwt";

export const signup = async (email: string, password: string) => {
  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({ data: { email, password: hashed } });
  const token = generateToken({ userId: user.id, email: user.email });
  return { user: { id: user.id, email: user.email }, token };
};

export const login = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = generateToken({ userId: user.id, email: user.email });
  return { user: { id: user.id, email: user.email }, token };
};
