import { Request, Response, NextFunction } from "express";
import { findUserByUid } from "../repositories/user/user.repository";
import { handleError } from "../utils/handlers/response/responseHandler";
import { firebase_customToken } from "../resources/firebase/services/customToken";

export const authenticateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        handleError(res, 401, "Token de autenticação não fornecido.");
        return;
    }

    const idToken = authHeader.split("Bearer ")[1];

    try {
        const decodedToken = await firebase_customToken.verify(idToken);

        if (!decodedToken.uid) {
            handleError(res, 400, "Token inválido: UID ausente.");
            return;
        }

        // Injeta o uid no request
        req.uid = decodedToken.uid;
        next();
    } catch (error) {
        console.error("Erro na autenticação:", error);
        handleError(res, 401, "Token inválido ou expirado.");
        return;
    }
};
