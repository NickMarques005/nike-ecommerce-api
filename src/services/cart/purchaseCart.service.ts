import { clearCart, findCartByUserId } from "../../repositories/cart/cart.repository";

export const purchaseCartService = async (userId: string): Promise<boolean> => {
    const cart = await findCartByUserId(userId);

    if (!cart || cart.products.length === 0) {
        return false;
    }

    // Realizar compra via Stripe

    await clearCart(userId);
    return true;
};