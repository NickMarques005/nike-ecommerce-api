import { findTheBestDiscountProducts } from "../../repositories/product/product.repository";

export const getBestDiscountProductsService = async () => {
    return await findTheBestDiscountProducts();
};