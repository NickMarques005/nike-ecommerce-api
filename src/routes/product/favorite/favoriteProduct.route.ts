import { Router } from "express";
import {
    addFavoriteProductController,
    removeFavoriteProductController,
    getAllFavoriteProductsController
} from "../../../controllers/favoriteProduct.controller";
import { authenticateUser } from "../../../middlewares/authenticateUser";

const router = Router();

// Aplica middleware de autenticação para todas as rotas dos produtos favoritados
router.use(authenticateUser);

router.get("/all", getAllFavoriteProductsController);
router.post("/add", addFavoriteProductController);
router.delete("/remove", removeFavoriteProductController);

export default router;