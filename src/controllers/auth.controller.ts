import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { signToken } from "../services/jwt.service";

const users: { email: string; password: string }[] = []; // simulate DB

export const signup = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  // Hash the user's password before storing it
  const hashedPassword = await bcrypt.hash(password, 10);

  // Store the user with the hashed password
  users.push({ email, password: hashedPassword });

  res.status(201).json({ message: "User registered successfully" });
};

export const signin = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  // Find the user by email
  const user = users.find((u) => u.email === email);

  if (!user) {
    res.status(400).json({ message: "Invalid credentials" });
    return;
  }

  // Compare the provided password with the stored hashed password
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    res.status(400).json({ message: "Invalid credentials" });
    return;
  }

  // Generate JWT token if credentials are valid
  const token = signToken({ email: user.email });

  res.json({ token });
};
