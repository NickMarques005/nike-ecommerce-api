import { Router } from "express";
import {
    getProductsBySearchController,
    getAllProductsController,
    getBestDiscountProductsController,
    getComboProductsController,
    getProductByIdController,
} from "../../controllers/product.controller";

import favoriteProductRoutes from "./favorite/favoriteProduct.route";

const router = Router();

router.get("/search", getProductsBySearchController);               // Rota para buscar produtos de acordo com o input de busca
router.get("/all", getAllProductsController);                       // Rota para buscar todos os produtos
router.get("/best-discounts", getBestDiscountProductsController);          // Rota para buscar os produtos com melhor desconto
router.get("/combo", getComboProductsController);                   // Rota para buscar os produtos de combo exclusivo da aplicação
router.get("/:productId", getProductByIdController);                // Rota para produto específico

router.use("/favorite", favoriteProductRoutes);                     // Rota principal dos produtos favoritados (*Necessita de Middleware de autenticação*)

export default router;