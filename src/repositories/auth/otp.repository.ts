import { addMinutes, isAfter } from "date-fns";
import { OtpModel } from "../../models/otpCode.model";
import { AuthContextType } from "../../types/auth/AuthContextTypes";

export const saveOtpCode = async (email: string, otp: string, token: string, authContext: AuthContextType) => {
    await OtpModel.findOneAndUpdate(
        { email },
        {
            email,
            otp,
            token,
            authContext,
            expiresAt: addMinutes(new Date(), 10),
        },
        { upsert: true, new: true }
    );
};

export const verifyOtpCode = async (email: string, otp: string, authContext: AuthContextType) => {
    const record = await OtpModel.findOne({ email, otp, authContext });

    if (!record || isAfter(new Date(), record.expiresAt)) return false;
    return true;
};

export const findOtpByTokenAndContext = async (token: string, authContext: AuthContextType) => {
    const record = await OtpModel.findOne({token, authContext });
    return record;
}

export const deleteOtpCodeByEmail = async (email: string) => {
    try {
        await OtpModel.deleteOne({ email });
    } catch (error) {
        console.error(`Erro ao deletar código OTP para o email ${email}:`, error);
        throw new Error("Erro ao remover código OTP.");
    }
};