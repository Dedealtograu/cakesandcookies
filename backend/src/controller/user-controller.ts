import type { Request, Response } from "express";
import { prisma } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Email e senha obrigatórios" });
      return;
    }

    const user = await prisma.user.findFirst({
      where: { email: email },
    });

    if (!user) {
      res.status(404).json({ message: "Usuário não encontrado" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({ message: "Usuário não encontrado" });
      return;
    }

    const { password: _, ...userWithoutPassword } = user;

    const token = jwt.sign({ userWithoutPassword }, process.env.JWT_SECRET!);

    res.cookie("user", token, { maxAge: 30 * 1000 });

    res.status(200).json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor" });
    return;
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, cep } = req.body;
    if (!name || !email || !password || !cep) {
      res.status(400).json({ message: "Todos os campos são obrigatórios" });
      return;
    }

    const hash = await bcrypt.hash(password, 10);

    const existingUser = await prisma.user.findFirst({
      where: { email: email },
    });
    if (existingUser) {
      res.status(409).json({ message: "Email já está em uso" });
      return;
    }
    const newUser = await prisma.user.create({
      data: { name: name, email: email, password: hash, cep: cep },
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor" });
    return;
  }
};
