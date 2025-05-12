import { Schema, model } from "mongoose";
import { IOTPCode } from "../types/models/otpCodeModelTypes";

const OtpSchema = new Schema<IOTPCode>(
    {
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true
        },
        otp: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true,
            unique: true
        },
        authContext: {
            type: String,
            enum: ["entrar", "criar-conta", "resetar-senha"],
            required: true
        },
        expiresAt: {
            type: Date,
            required: true
        }
    },
    {
        timestamps: true
    }
);

OtpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });   // Configuração de expiração do otp

export const OtpModel = model<IOTPCode>("OtpCode", OtpSchema);

