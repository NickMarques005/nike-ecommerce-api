import { findProductsByCombo } from "../../repositories/product/product.repository";

export const getComboProductsService = async (comboName: string) => {
    return await findProductsByCombo(comboName);
};