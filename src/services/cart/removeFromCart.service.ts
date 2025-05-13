import mongoose from "mongoose";
import { decrementCartItemQuantity, findCartByUserId, removeCartItem } from "../../repositories/cart/cart.repository";
import { BadRequestError, NotFoundError } from "../../utils/errors";

interface RemoveProductFromCartServiceParams {
    userId: string;
    productId: string;
    quantity: number;
    selectedSize: string;
}
/**
 * Serviço para remover um item (ou reduzir a quantidade) do carrinho do usuário.
 * - Se a quantidade a remover for maior ou igual à existente, o produto é removido.
 * - Se a quantidade a remover for menor, apenas decrementa.
 */
export const removeProductFromCartService = async ({
    userId,
    productId,
    quantity,
    selectedSize,
}: RemoveProductFromCartServiceParams) => {
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        throw new BadRequestError("ID do produto inválido.");
    }

    if (quantity <= 0) {
        throw new BadRequestError("A quantidade a remover deve ser maior que zero.");
    }

    const cart = await findCartByUserId(userId);
    if (!cart) {
        throw new NotFoundError("Carrinho não encontrado.");
    }

    const productInCart = cart.products.find(
        (p) => p.productId.toString() === productId && p.selectedSize === selectedSize
    );

    if (!productInCart) {
        throw new NotFoundError("Produto com este tamanho não está no carrinho.");
    }

    if (quantity >= productInCart.quantity) {
        return removeCartItem(userId, productId, selectedSize);
    }

    return decrementCartItemQuantity(userId, productId, selectedSize, quantity);
};
