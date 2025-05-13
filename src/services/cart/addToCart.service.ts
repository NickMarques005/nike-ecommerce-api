import mongoose from "mongoose";
import { addNewCartItem, createEmptyCartForUser, findCartByUserId, incrementCartItemQuantity } from "../../repositories/cart/cart.repository";
import { BadRequestError, NotFoundError } from "../../utils/errors";

interface AddProductToCartServiceParams {
    userId: string;
    productId: string;
    quantity: number;
    selectedSize: string;
}
/**
 * Serviço para adicionar um item (ou mais) ao carrinho do usuário.
 * Se o carrinho não existir ainda, ele é criado automaticamente.
 */
export const addProductToCartService = async ({
    userId,
    productId,
    quantity,
    selectedSize,
}: AddProductToCartServiceParams) => {
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        throw new BadRequestError("ID do produto inválido.");
    }

    if (quantity <= 0) {
        throw new BadRequestError("A quantidade deve ser maior que zero.");
    }

    let cart = await findCartByUserId(userId);

    if (!cart) {
        cart = await createEmptyCartForUser(userId);
    }

    const productAlreadyInCart = cart.products.some(
        (item) =>
            item.productId.toString() === productId &&
            item.selectedSize === selectedSize
    );

    if (productAlreadyInCart) {
        return incrementCartItemQuantity(userId, productId, selectedSize, quantity);
    }

    return addNewCartItem(userId, productId, quantity, selectedSize);
};