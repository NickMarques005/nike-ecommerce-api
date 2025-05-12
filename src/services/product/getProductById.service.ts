import { findProductById, findProductsByName } from "../../repositories/product/product.repository";
import { NotFoundError } from "../../utils/errors";


export const getProductByIdService = async (productId: string) => {
    const selectedProduct = await findProductById(productId);

    if (!selectedProduct) {
        throw new NotFoundError("Produto não encontrado.");
    }

    // Busca todas as variantes com o mesmo nome
    const regex = new RegExp(`^${selectedProduct.normalized_name}$`, "i");
    const variants = await findProductsByName(regex);

    return {
        selectedProduct,
        variants,
    };
};