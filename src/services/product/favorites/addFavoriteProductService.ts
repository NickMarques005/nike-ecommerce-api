import { createFavoriteProduct } from "../../../repositories/product/favoriteProduct.repository";
import { IFavoriteProduct } from "../../../types/product/favoriteProductTypes";

/**
 * Serviço para adicionar um produto aos favoritos do usuário.
 * @param userId ID do usuário
 * @param productId ID do produto a ser favoritado
 */
export const addFavoriteProductService = async (userId: string, productId: string): Promise<IFavoriteProduct> => {
    return await createFavoriteProduct(userId, productId);
};
