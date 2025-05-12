import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { handleError } from "../utils/handlers/response/responseHandler";

export const errorManagementMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
    console.error("Erro capturado:", err);
    // Se for uma instância de erro com status customizado
    if (err?.statusCode && err?.message) {
        handleError(res, err.statusCode, err.message);
        return;
    }

    // Se for um erro padrão
    if (err instanceof Error) {
        handleError(res, 422, err.message);
        return;
    }

    // Fallback genérico
    handleError(res, 500, "Erro interno no servidor.");
};