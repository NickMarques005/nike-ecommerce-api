import { Response } from "express";

/**
 * 
 *  Função que lida com o erro retornado ao cliente que efetuou a requisição
 * 
 * @param res Resposta
 * @param status Status da resposta
 * @param error Error da requisição
 * @param data Dados retornados para o cliente que aplicou a requisição
 * @returns 
 */
export const handleError = (
    res: Response,
    status: number = 500,
    error = "Erro desconhecido",
    data?: any
) => {
    return res.status(status).json({
        success: false,
        error: `(${status}) ${status === 500 ? "Erro interno no servidor" : "Houve um erro"} - ${error}`,
        ...(data ? { data } : {})
    });
};

/**
 * 
 * @param res Resposta
 * @param status Status da resposta
 * @param message Mensagem de sucesso da requisição
 * @param data Dados retornados para o cliente que aplicou a requisição
 * @returns 
 */
export const handleSuccess = (
    res: Response,
    status: number = 200,
    message: string | null = null,
    data?: any
) => {
    return res.status(status).json({
        success: true,
        message,
        data
    });
};