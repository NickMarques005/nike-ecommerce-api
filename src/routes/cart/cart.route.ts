import { Router } from "express";
import {
    getCartItemsController,
    updateCartItemQuantityController,
    updateCartItemRemovalController,
    purchaseCartController
} from "../../controllers/cart.controller";
import { authenticateUser } from "../../middlewares/authenticateUser";

const router = Router();

// Middleware de autenticação adicionado às rotas do carrinho
router.use(authenticateUser);

router.get("/all", getCartItemsController);                     // Rota responsável por obter todos os itens do carrinho.
router.put("/items/add", updateCartItemQuantityController);     // Rota responsável por adicionar ou aumentar a quantidade de um item no carrinho.
router.put("/items/remove", updateCartItemRemovalController);   // Rota responsável por remover ou diminuir a quantidade de um item no carrinho.
router.post("/purchase", purchaseCartController);               // Rota responsável por finalizar a compra dos itens do carrinho.

export default router;