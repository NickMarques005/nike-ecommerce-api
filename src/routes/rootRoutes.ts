import { Router } from "express";
import authRoutes from "./auth/auth.route";
import productRoutes from "./product/product.route";
import cartRoutes from "./cart/cart.route";
import userRoutes from "./user/user.route";

const rootRouter = Router();

rootRouter.use("/auth", authRoutes);            // Rotas de Autenticação
rootRouter.use("/product", productRoutes);      // Rotas de Produtos
rootRouter.use("/cart", cartRoutes);            // Rotas de Carrinho e Compra
rootRouter.use("/user", userRoutes);            // Rotas do usuário

export default rootRouter;