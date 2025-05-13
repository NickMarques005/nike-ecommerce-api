import mongoose from "mongoose";
import { CartModel } from "../../models/cart.model";
import { ICart } from "../../types/cart/cartTypes";

/**
 * Busca o carrinho de um usuário específico pelo seu ID.
 */
export const findCartByUserId = async (userId: string): Promise<ICart | null> => {
    return CartModel.findOne({ userId });
};

/**
 * Cria um novo carrinho vazio para um usuário.
 */
export const createEmptyCartForUser = async (userId: string): Promise<ICart> => {
    return CartModel.create({ userId, products: [] });
};

/**
 * Incrementa a quantidade de um item já existente no carrinho.
 */
export const incrementCartItemQuantity = async (
    userId: string,
    productId: string,
    selectedSize: string,
    amount: number
): Promise<ICart | null> => {
    return CartModel.findOneAndUpdate(
        {
            userId,
            "products.productId": new mongoose.Types.ObjectId(productId),
            "products.selectedSize": selectedSize,
        },
        {
            $inc: { "products.$.quantity": amount },
        },
        { new: true }
    );
};

/**
 * Decrementa a quantidade de um item já existente no carrinho.
 * Lembre-se: se a lógica envolver remover o item se a quantidade chegar a 0,
 * isso deve ser tratado no service.
 */
export const decrementCartItemQuantity = async (
    userId: string,
    productId: string,
    selectedSize: string,
    amount: number
): Promise<ICart | null> => {
    return incrementCartItemQuantity(userId, productId, selectedSize, -amount);
};

/**
 * Adiciona um novo item ao carrinho (caso ainda não exista).
 */
export const addNewCartItem = async (
    userId: string,
    productId: string,
    quantity: number,
    selectedSize: string
): Promise<ICart | null> => {
    return CartModel.findOneAndUpdate(
        { userId },
        {
            $push: {
                products: {
                    productId: new mongoose.Types.ObjectId(productId),
                    quantity,
                    selectedSize,
                },
            },
        },
        { upsert: true, new: true }
    );
};

/**
 * Remove um item específico do carrinho do usuário.
 */
export const removeCartItem = async (
    userId: string,
    productId: string,
    selectedSize: string
): Promise<ICart | null> => {
    return CartModel.findOneAndUpdate(
        { userId },
        {
            $pull: {
                products: {
                    productId: new mongoose.Types.ObjectId(productId),
                    selectedSize,
                },
            },
        },
        { new: true }
    );
};

/**
 * Remove todos os itens do carrinho, mantendo o documento.
 */
export const clearCart = async (userId: string): Promise<ICart | null> => {
    return CartModel.findOneAndUpdate(
        { userId },
        { $set: { products: [] } },
        { new: true }
    );
};
