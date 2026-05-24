import { Router } from "express";
import { auth, login, logout, register } from "./controller/user-controller.js";
import { authMiddleware } from "./middlewares/auth-middleware.js";
import { deleteProduct, getAllProducts } from "./controller/product-controller.js";

export const router = Router();
// Rotas de usuário
router.post("/login", login);
router.post("/register", register);
router.get("/auth", authMiddleware, auth);
router.post("/logout", authMiddleware, logout);

// Rotas de produtos
router.get("/get-products", getAllProducts);
router.delete("/delete-product/:id", authMiddleware, deleteProduct);
