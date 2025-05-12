import { findFavoriteProducts } from "../../../repositories/product/favoriteProduct.repository";
import { findProductById } from "../../../repositories/product/product.repository";
import { IFavoriteProduct } from "../../../types/product/favoriteProductTypes";
import { ProductData } from "../../../types/product/productTypes";

/**
 * Retorna todos os produtos favoritados de um usuário.
 * @param userId ID do usuário autenticado
 */
export const getAllFavoriteProductsService = async (
    userId: string
): Promise<ProductData[]> => {
    const favoriteProducts = await findFavoriteProducts(userId);

    const productPromises = favoriteProducts.map((favorite) =>
        findProductById(favorite.productId.toString())
    );

    const products = await Promise.all(productPromises);

    return products.filter((product): product is ProductData => product !== null);
};