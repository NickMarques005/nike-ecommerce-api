import { deleteFavoriteProduct } from "../../../repositories/product/favoriteProduct.repository";

/**
 * Serviço responsável por remover um produto favoritado de um usuário.
 * @param userId ID do usuário
 * @param productId ID do produto a ser removido dos favoritos
 */
export const removeFavoriteProductService = async (userId: string, productId: string): Promise<void> => {
    await deleteFavoriteProduct(userId, productId);
};
