import mongoose from "mongoose";
import { addOrUpdateCartItem, createCartForUser, findCartByUserId } from "../../repositories/cart/cart.repository";
import { BadRequestError, NotFoundError } from "../../utils/errors";

interface AddProductToCartServiceParams {
    userId: string;
    productId: string;
    quantity: number;
}

/**
 * Serviço para adicionar um item (ou mais) ao carrinho do usuário.
 * Se o carrinho não existir ainda, ele é criado automaticamente.
 */
export const addProductToCartService = async ({
    userId,
    productId,
    quantity
}: AddProductToCartServiceParams) => {
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        throw new BadRequestError("ID do produto inválido.");
    }

    if (quantity <= 0) {
        throw new NotFoundError("A quantidade deve ser maior que zero.");
    }

    const cart = await findCartByUserId(userId);
    if (!cart){ 
        // Carrinho é criado caso não exista
        await createCartForUser(userId);
    }

    // Adiciona produto e sua quantidade
    return addOrUpdateCartItem(userId, productId, quantity);
};