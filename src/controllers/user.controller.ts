import { Request, Response } from "express";
import { asyncHandler } from "../utils/handlers/async/asyncHandler";
import { handleSuccess } from "../utils/handlers/response/responseHandler";
import { UserData } from "../types/user/userTypes";
import { getUserDataService } from "../services/user/getUserData.service";
import { UnauthorizedError } from "../utils/errors";

export const getUserDataController = asyncHandler(async (req: Request, res: Response) => {
    const uid = req.uid;
    if (!uid) throw new UnauthorizedError("Identificador do usuário não encontrado.");

    const userData: UserData = await getUserDataService(uid);
    return handleSuccess(res, 200, "Usuário retornado com sucesso", userData);
});