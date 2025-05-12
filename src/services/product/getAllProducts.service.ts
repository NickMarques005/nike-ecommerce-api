import { findAllProducts } from "../../repositories/product/product.repository";

/**
 * Serviço para buscar todos os produtos no banco de dados.
 * Retorna todos os produtos sem nenhum filtro.
 */
export const getAllProductsService = async () => {
    try {
        // Chama o repositório para buscar todos os produtos
        const products = await findAllProducts();
        return products;
    } catch (err) {
        throw new Error("Erro ao buscar todos os produtos");
    }
};