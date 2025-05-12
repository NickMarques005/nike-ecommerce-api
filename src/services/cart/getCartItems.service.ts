import { createCartForUser, findCartByUserId } from "../../repositories/cart/cart.repository";

export const getCartItemsService = async (userId: string) => {
    let cart = await findCartByUserId(userId);

    if (!cart) {
        // Se carrinho não existir, criar um novo
        cart = await createCartForUser(userId);
    }

    return cart;
};
