import { deleteOtpCodeByEmail, verifyOtpCode } from "../../repositories/auth/otp.repository";
import { firebase_userManagement } from "../../resources/firebase/services/userManagement";
import { AuthContextType } from "../../types/auth/AuthContextTypes";
import { CheckUserBeforeSignInCredentials } from "../../types/auth/AuthCredentialTypes";
import { BadRequestError, UnauthorizedError } from "../../utils/errors";

export const checkUserBeforeSignInService = async (
    data: CheckUserBeforeSignInCredentials, 
    context: AuthContextType): Promise<void> => {
    const { email, otp_code } = data;

    const validOtp = await verifyOtpCode(email, otp_code, context);
    if (!validOtp) {
        throw new UnauthorizedError("Código OTP inválido ou expirado.");
    }

    // Verifica se o usuário existe no Firebase
    try {
        await firebase_userManagement.getUserByEmail(email);
    } catch (err: any) {
        if (err.code === "auth/user-not-found") {
            throw new BadRequestError("Usuário não encontrado. Faça o cadastro primeiro.");
        }

        throw new BadRequestError("Erro ao verificar usuário.");
    }

    // Excluir o OTP usado
    await deleteOtpCodeByEmail(email);
};