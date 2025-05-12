import { FavoriteProductModel } from "../../models/favoriteProduct.model";
import { IFavoriteProduct } from "../../types/product/favoriteProductTypes";

/**
 * Marca um produto como favorito para um dado usuário.
 * @param userId  ID do usuário que está favoritando
 * @param productId  ID do produto a ser favoritado
 * @returns O documento criado
 */
export const createFavoriteProduct = async (
    userId: string,
    productId: string
): Promise<IFavoriteProduct> => {
    const favorite = new FavoriteProductModel({ userId, productId });
    return await favorite.save();
};

/**
 * Remove um produto dos favoritos de um usuário.
 * @param userId  ID do usuário
 * @param productId  ID do produto a remover
 * @returns O resultado da operação de remoção
 */
export const deleteFavoriteProduct = async (
    userId: string,
    productId: string
): Promise<{ deletedCount?: number }> => {
    return await FavoriteProductModel.deleteOne({ userId, productId });
};

/**
 * Busca todos os produtos favoritados de um usuário.
 * @param userId ID do usuário
 * @returns Array de documentos FavoriteProduct
 */
export const findFavoriteProducts = async (
    userId: string
): Promise<IFavoriteProduct[]> => {
    return await FavoriteProductModel.find({ userId });
};