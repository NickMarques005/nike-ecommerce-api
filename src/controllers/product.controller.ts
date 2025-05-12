
import { Request, Response } from "express";
import { asyncHandler } from "../utils/handlers/async/asyncHandler";
import { handleSuccess } from "../utils/handlers/response/responseHandler";
import { getProductsBySearchService } from "../services/product/getProductsBySearch.service";
import { getAllProductsService } from "../services/product/getAllProducts.service";
import { BadRequestError, NotFoundError } from "../utils/errors";
import { getBestDiscountProductsService } from "../services/product/getBestDiscountProducts.service";
import { getProductByIdService } from "../services/product/getProductById.service";
import { getComboProductsService } from "../services/product/getComboProducts.service";

/**
 * Controller para buscar produtos com base no parâmetro de busca fornecido
 * A pesquisa é realizada no nome do produto (normalizado).
 */
export const getProductsBySearchController = asyncHandler(async (req: Request, res: Response) => {
    const searchQuery = req.query.q as string;

    if (!searchQuery) {
        throw new BadRequestError("Parâmetro de busca é obrigatório.");
    }

    const products = await getProductsBySearchService({ searchQuery });
    return handleSuccess(res, 200, `${products.length} Produtos encontrados com sucesso.`, products);
});

/**
 * Controller para buscar todos os produtos cadastrados no banco de dados
 * Retorna todos os produtos sem filtros.
 */
export const getAllProductsController = asyncHandler(async (req: Request, res: Response) => {
    const products = await getAllProductsService();
    return handleSuccess(res, 200, `Total de ${products.length} produtos recuperados com sucesso.`, products);
});

/**
 * Controller para buscar um produto específico baseado no seu ID.
 * O ID do produto é passado como parâmetro na URL.
 */
export const getProductByIdController = asyncHandler(async (req: Request, res: Response) => {
    const { productId } = req.params;
    const product = await getProductByIdService(productId);
    return handleSuccess(res, 200, "Produto recuperado com sucesso.", product);
});

/**
 * Controller para buscar os produtos com melhor desconto
 * Os produtos são ordenados de acordo com o valor de desconto aplicado.
 */
export const getBestDiscountProductsController = asyncHandler(async (req: Request, res: Response) => {
    const products = await getBestDiscountProductsService();
    return handleSuccess(res, 200, "Top 10 produtos com maior desconto recuperados com sucesso.", products);
});

/**
 * Controller para buscar produtos de combo exclusivo da aplicação
 * Os combos são produtos com algum tipo de promoção especial ou oferecimento de pacote.
 */
export const getComboProductsController = asyncHandler(async (req: Request, res: Response) => {
    const { combo } = req.query;

    if (!combo || typeof combo !== "string") {
        throw new BadRequestError("Combo não especificado ou inválido." );
    }

    const comboProducts = await getComboProductsService(combo);

    if(comboProducts.length == 0)
    {
        throw new NotFoundError("Nenhum produto de combo encontrado.");
    }

    return handleSuccess(res, 200, "Produtos de combo buscados com sucesso", comboProducts);
});

