import { generateOTP, generateVerificationToken } from "../../utils/auth/otpHandler";
import * as otpRepository from "../../repositories/auth/otp.repository";
import { AuthContextType } from "../../types/auth/AuthContextTypes";
import { verifyAccountMailService } from "../../resources/mail/services/verifyAccount";
import { InternalServerError } from "../../utils/errors";
import { firebase_userManagement } from "../../resources/firebase/services/userManagement";

type ResendOtpParams = {
    email: string;
};

export const resendOtpService = async ({ email }: ResendOtpParams) => {
    const otp = generateOTP();
    const verificationToken = generateVerificationToken();

    const baseUrl = process.env.CLIENT_URL;
    if (!baseUrl) throw new InternalServerError("CLIENT_URL não está configurada.");

    let context: AuthContextType = "criar-conta";
    try {
        await firebase_userManagement.getUserByEmail(email);
        context = "entrar";
    } catch (err: any) {
        if (err.code !== "auth/user-not-found") {
            console.error("Erro ao verificar e-mail no Firebase:", err);
            throw new InternalServerError("Erro ao verificar usuário.");
        }
    }

    const redirectUrl = `${baseUrl}/auth/${context}?token=${verificationToken}`;

    try {
        await otpRepository.saveOtpCode(email, otp, verificationToken, context);
    } catch (err) {
        throw new InternalServerError("Erro ao salvar o novo código OTP.");
    }

    try {
        await verifyAccountMailService({ email, otp, redirectUrl });
    } catch (err) {
        throw new InternalServerError("Erro ao reenviar e-mail de verificação.");
    }

    return { redirectUrl };
};