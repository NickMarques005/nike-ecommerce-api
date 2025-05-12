import { Request, Response } from "express";
import { handleSuccess } from "../utils/handlers/response/responseHandler";
import { signUpService } from "../services/auth/signUp.service";
import { initAuthService } from "../services/auth/initAuth.service";
import { asyncHandler } from "../utils/handlers/async/asyncHandler";
import { checkUserBeforeSignInService } from "../services/auth/signIn.service";
import { validateAuthTokenService } from "../services/auth/validateAuthToken.service";
import { AuthContextType } from "../types/auth/AuthContextTypes";
import { isValidAuthContext } from "../utils/auth/validateAuthContext";
import { resendOtpService } from "../services/auth/resendOTP.service";
import { singleSignOnService } from "../services/auth/singleSignOn.service";
import { BadRequestError } from "../utils/errors";

/**
 * 
 */
export const initAuthController = asyncHandler(async (req: Request, res: Response) => {
    const { email } = req.body;

    if (!email) {
        throw new BadRequestError("E-mail é obrigatório.");
    }

    const result = await initAuthService({ email });
    return handleSuccess(res, 200, "Código de autenticação enviado com sucesso.", result);
});

/**
 * 
 */
export const signUpController = asyncHandler(async (req: Request, res: Response) => {
    const { email, name, birth, password, otp_code } = req.body;
    if (!email || !name || !birth || !password || !otp_code) {
        throw new BadRequestError("Todos os campos são obrigatórios.");
    }

    await signUpService({ email, name, birth, password, otp_code }, "criar-conta");
    return handleSuccess(res, 201, "Usuário criado com sucesso.");
});

/**
 * 
 */
export const checkUserBeforeSignInController = asyncHandler(async (req: Request, res: Response) => {
    const { email, otp_code } = req.body;

    if (!email || !otp_code) {
        throw new BadRequestError("E-mail e código OTP são obrigatórios.");
    }

    await checkUserBeforeSignInService({ email, otp_code }, "entrar");

    return handleSuccess(res, 200, "Usuário verificado com sucesso.");
});

/**
 * 
 */
export const validateAuthTokenController = asyncHandler(async (req: Request, res: Response) => {
    const { token, context } = req.query;

    if (typeof token !== 'string' || typeof context !== 'string') {
        throw new BadRequestError("Parâmetros inválidos");
    }

    if (!isValidAuthContext(context)) {
        throw new BadRequestError("Contexto inválido.");
    }

    const result = await validateAuthTokenService(token, context as AuthContextType);
    return handleSuccess(res, 200, "Token válido.", result);
});

/**
 * 
 */
export const resendOtpController = asyncHandler(async (req: Request, res: Response) => {
    const { email } = req.body;

    if (!email) {
        throw new BadRequestError("E-mail é obrigatório.");
    }

    const result = await resendOtpService({ email });
    return handleSuccess(res, 200, "Código reenviado com sucesso.", result);
});

/**
 * 
 */
export const singleSignOnController = asyncHandler(async (req: Request, res: Response) => {
    const { idToken, credentials } = req.body;

    if (!idToken || !credentials || !credentials.email || !credentials.uid) {
        throw new BadRequestError("Dados incompletos para autenticação via SSO.");
    }

    await singleSignOnService(idToken, credentials);

    return handleSuccess(res, 200, "Autenticação por SSO realizada com sucesso.");
});