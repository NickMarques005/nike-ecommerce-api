
import { Request, Response } from "express";
import { asyncHandler } from "../utils/handlers/async/asyncHandler";
import { BadRequestError, UnauthorizedError } from "../utils/errors";
import { getCartItemsService } from "../services/cart/getCartItems.service";
import { handleSuccess } from "../utils/handlers/response/responseHandler";
import { removeProductFromCartService } from "../services/cart/removeFromCart.service";
import { purchaseCartService } from "../services/cart/purchaseCart.service";
import { addProductToCartService } from "../services/cart/addToCart.service";

/**
 * Controller responsável por buscar os itens do carrinho de um usuário.
 */
export const getCartItemsController = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.uid;
    if (!userId) {
        throw new UnauthorizedError("Usuário não autenticado.");
    }

    const cart = await getCartItemsService(userId);
    return handleSuccess(res, 200, "Itens do carrinho obtidos com sucesso", cart);
});

/**
 * Controller responsável por adicionar itens ao carrinho do usuário.
 */
export const updateCartItemQuantityController = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.uid;
    const { productId, quantity } = req.body;

    if (!userId) {
        throw new UnauthorizedError("Usuário não autenticado.");
    }

    if (!productId || typeof quantity !== "number") {
        throw new BadRequestError("É necessário fornecer 'productId' e 'quantity'.");
    }

    const updatedCart = await addProductToCartService({ userId, productId, quantity });
    return handleSuccess(res, 200, "Produto adicionado ao carrinho com sucesso", updatedCart);
});

/**
 * Controller responsável por remover ou reduzir a quantidade de um item no carrinho do usuário.
 */
export const updateCartItemRemovalController = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.uid;
    const { productId, quantity } = req.body;

    if (!userId) {
        throw new UnauthorizedError("Usuário não autenticado.");
    }

    if (!productId || typeof quantity !== "number") {
        throw new BadRequestError("É necessário fornecer 'productId' e 'quantity'.");
    }

    const updatedCart = await removeProductFromCartService({ userId, productId, quantity });
    return handleSuccess(res, 200, "Produto removido do carrinho com sucesso", updatedCart);
});

/**
 * Controller responsável por finalizar a compra dos itens do carrinho e esvaziá-lo.
 */
export const purchaseCartController = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.uid;
    if (!userId) {
        throw new UnauthorizedError("Usuário não autenticado.");
    }

    const success = await purchaseCartService(userId);
    if (!success) {
        return handleSuccess(res, 400, "Carrinho vazio ou inexistente. Nenhuma compra realizada.");
    }

    return handleSuccess(res, 200, "Compra realizada com sucesso. Carrinho esvaziado.");
});