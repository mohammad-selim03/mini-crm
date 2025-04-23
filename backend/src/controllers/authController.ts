import { Request, Response } from 'express';
import * as AuthService from '../services/authServices';

export const signup = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const { user, token } = await AuthService.signup(email, password);
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const { user, token } = await AuthService.login(email, password);
    res.json({ user, token });
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
};
