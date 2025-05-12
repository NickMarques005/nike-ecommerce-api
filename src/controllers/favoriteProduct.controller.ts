import { getAllFavoriteProductsService } from "../services/product/favorites/getAllFavoriteProductsService";
import { BadRequestError, UnauthorizedError } from "../utils/errors";
import { asyncHandler } from "../utils/handlers/async/asyncHandler";
import { Request, Response } from "express";
import { handleSuccess } from "../utils/handlers/response/responseHandler";
import { addFavoriteProductService } from "../services/product/favorites/addFavoriteProductService";
import { removeFavoriteProductService } from "../services/product/favorites/removeFavoriteProductService";

/**
 * Controller responsável por adicionar um produto aos favoritos de um usuário.
 */
export const addFavoriteProductController = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.uid;
    if (!userId) {
        throw new UnauthorizedError("Usuário não autenticado.");
    }

    const { productId } = req.body;
    if (!productId) {
        throw new BadRequestError("É necessário fornecer o ID do produto.");
    }

    const favoriteProduct = await addFavoriteProductService(userId, productId);
    return handleSuccess(res, 201, "Produto adicionado aos favoritos com sucesso", favoriteProduct);
});

/**
 * Controller responsável por remover um produto dos favoritos de um usuário.
 */
export const removeFavoriteProductController = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.uid;
    if (!userId) {
        throw new UnauthorizedError("Usuário não autenticado.");
    }

    const { productId } = req.body;
    if (!productId) {
        throw new BadRequestError("É necessário fornecer o ID do produto.");
    }

    await removeFavoriteProductService(userId, productId);
    return handleSuccess(res, 200, "Produto removido dos favoritos com sucesso");
});

/**
 * Controller responsável por buscar todos os produtos favoritados de um usuário.
 */
export const getAllFavoriteProductsController = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.uid;
    if (!userId) {
        throw new UnauthorizedError("Usuário não autenticado.");
    }

    const favoriteProducts = await getAllFavoriteProductsService(userId);
    return handleSuccess(res, 200, "Produtos favoritos buscados com sucesso", favoriteProducts);
});