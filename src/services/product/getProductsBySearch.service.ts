import { findProductsByName } from "../../repositories/product/product.repository";
import { InternalServerError } from "../../utils/errors";
import { cleanSearchQuery } from "../../utils/search/cleanSearchQuery";

interface SearchParams {
    searchQuery: string;
}

export const getProductsBySearchService = async ({ searchQuery }: SearchParams) => {
    try {
        const normalizedQuery = cleanSearchQuery(searchQuery);

        const regexPattern = normalizedQuery.split(" ").join(".*");
        const regex = new RegExp(regexPattern, "i");

        const products = await findProductsByName(regex);
        return products;
    } catch (err) {
        throw new InternalServerError("Erro ao buscar produtos no serviço.");
    }
};