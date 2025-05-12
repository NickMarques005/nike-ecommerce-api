// repositories/product/productRepository.ts
import { ProductModel } from "../../models/product.model";
import { Audience, ProductData } from "../../types/product/productTypes";

/**
 * Busca todos os produtos cadastrados no banco de dados.
 * Retorna todos os documentos da coleção de produtos.
 */
export const findAllProducts = async () => {
    return await ProductModel.find({});
};

/**
 * Busca produtos pelo nome
 */
export const findProductsByName = async (regex: RegExp) => {
    return await ProductModel.find({ normalized_name: { $regex: regex } });
};

/**
 * Busca produtos por categoria (insensitive).
 */
export const findProductsByCategory = async (category: string) => {
    return await ProductModel.find({ category });
};

/**
 * Busca produtos por subcategoria (insensitive).
 */
export const findProductsBySubCategory = async (subcategory: string) => {
    return await ProductModel.find({ subcategory });
};

/**
 * Busca produtos por público-alvo (audience).
 */
export const findProductsByAudience = async (audience: Audience) => {
    return await ProductModel.find({ audience });
};

/**
 * Busca os 10 produtos com a maior porcentagem de desconto.
 */
export const findTheBestDiscountProducts = async () => {
    return await ProductModel.find({})
        .sort({ discount: -1 })
        .limit(10);
};

/**
 * Busca um produto específico pelo seu ID.
 */
export const findProductById = async (productId: string): Promise<ProductData | null> => {
    return await ProductModel.findById(productId);
};

/**
 * Busca produtos por combo (nomes de combos podem ser únicos ou múltiplos).
 */
export const findProductsByCombo = async (comboName: string) => {
    return await ProductModel.find({ combo: { $in: [comboName] } });
};