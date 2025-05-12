import { findOtpByTokenAndContext } from "../../repositories/auth/otp.repository";
import { AuthContextType } from "../../types/auth/AuthContextTypes";
import { NotFoundError } from "../../utils/errors";
import { isAfter } from "date-fns";

export const validateAuthTokenService = async (token: string, context: AuthContextType) => {
    const record = await findOtpByTokenAndContext(token, context);

    if (!record) {
        throw new NotFoundError("Token não encontrado.");
    }

    if (isAfter(new Date(), record.expiresAt)) {
        throw new NotFoundError("Token expirado.");
    }

    return {
        email: record.email,
    };
};