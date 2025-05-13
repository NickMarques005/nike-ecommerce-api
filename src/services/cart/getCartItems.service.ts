import { createCartForUser, findCartByUserId } from "../../repositories/cart/cart.repository";
import { findProductById } from "../../repositories/product/product.repository";
import { CartProductCompleteData } from "../../types/cart/cartTypes";
import { NotFoundError } from "../../utils/errors";

export const getCartItemsService = async (userId: string) => {
    let cart = await findCartByUserId(userId);

    if (!cart) {
        // Se carrinho não existir, criar um novo
        cart = await createCartForUser(userId);
    }

    const completeCartData: CartProductCompleteData[] = [];

    for (const item of cart.products) {
        const product = await findProductById(item.productId.toString());

        if (!product) {
            throw new NotFoundError(`Produto com ID ${item.productId} não encontrado.`);
        }

        completeCartData.push({
            product,
            quantity: item.quantity,
            selectedSize: item.selectedSize
        });
    }

    return completeCartData;
};
