import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { signToken } from "../services/jwt.service";

const users: { email: string; password: string }[] = []; // simulate DB

export const signup = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  users.push({ email, password: hashedPassword });

  res.status(201).json({ message: "User registered successfully" });
};

export const signin = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email);

  if (!user) {
    res.status(400).json({ message: "Invalid credentials" });
    return;
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    res.status(400).json({ message: "Invalid credentials" });
    return;
  }

  const token = signToken({ email: user.email });

  res.json({ token });
};
