import type { Request, Response } from "express";
import { prisma } from "../db.js";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany();

    if (products.length === 0) {
      res.status(404).json({ message: "Nenhum produto encontrado" });
      return;
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor" });
    return;
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { user } = req;

    if (!user?.admin) {
      res.status(403).json({ message: "Acesso negado" });
      return;
    }

    const { id } = req.params;

    if (!id) {
      res.status(400).json({ message: "ID do produto não fornecido" });
      return;
    }
    const deletedProduct = await prisma.product.delete({ where: { id: id } });

    if (!deletedProduct) {
      res.status(404).json({ message: "Produto não encontrado" });
      return;
    }

    res.json({ id });
  } catch (error: any) {
    if (error.code === "P2025") {
      res.status(404).json({ message: "Produto não encontrado" });
      return;
    }
    res.status(500).json({ message: "Erro interno do servidor" });
    return;
  }
};