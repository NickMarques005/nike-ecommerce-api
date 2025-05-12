
import mongoose from "mongoose";
import { CartModel } from "../../models/cart.model";
import { ICart } from "../../types/cart/cartTypes";

/**
 * Busca o carrinho de um usuário específico pelo seu ID.
 * Retorna null se não existir.
 */
export const findCartByUserId = async (userId: string): Promise<ICart | null> => {
    return CartModel.findOne({ userId });
};

/**
 * Cria um novo carrinho vazio para um usuário.
 * Útil para inicializar o carrinho na criação da conta, por exemplo.
 */
export const createCartForUser = async (userId: string): Promise<ICart> => {
    return CartModel.create({ userId, products: [] });
};

/**
 * Adiciona um item ao carrinho ou atualiza a quantidade se ele já existir.
 * 
 * Primeiro tenta encontrar o produto no carrinho:
 *  - Se encontrado: incrementa a quantidade.
 *  - Se não encontrado: insere o produto com a quantidade informada.
 */
export const addOrUpdateCartItem = async (
    userId: string,
    productId: string,
    quantity: number
): Promise<ICart> => {
    // Tenta encontrar o produto no carrinho e atualiza a quantidade se ele já existir
    const cart = await CartModel.findOneAndUpdate(
        { userId, "products.productId": productId },
        {
            $inc: { "products.$.quantity": quantity } // incrementa a quantidade do produto existente
        },
        { new: true }
    );

    // Se o produto já existia e foi atualizado, retorna o carrinho atualizado
    if (cart) return cart;

    // Caso o produto não exista no carrinho, adiciona um novo item ao array de produtos
    return CartModel.findOneAndUpdate(
        { userId },
        {
            $push: {
                products: { productId: new mongoose.Types.ObjectId(productId), quantity }
            }
        },
        { upsert: true, new: true } // upsert cria um novo documento se não existir
    );
};

/**
 * Remove um item específico do carrinho do usuário.
 * Utiliza o operador `$pull` para excluir o item do array de produtos.
 */
export const removeCartItem = async (
    userId: string,
    productId: string
): Promise<ICart | null> => {
    return CartModel.findOneAndUpdate(
        { userId },
        { $pull: { products: { productId: new mongoose.Types.ObjectId(productId) } } },
        { new: true }
    );
};

/**
 * Limpa todos os itens do carrinho do usuário, mantendo o documento mas com array vazio.
 */
export const clearCart = async (userId: string): Promise<ICart | null> => {
    return CartModel.findOneAndUpdate(
        { userId },
        { $set: { products: [] } }, // substitui o array por um array vazio
        { new: true }
    );
};