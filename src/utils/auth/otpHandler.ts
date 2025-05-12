import crypto from "crypto";

export const generateOTP = () => {
    return Math.floor(10000000 + Math.random() * 90000000).toString(); // Criação de 8 dígitos para o OTP
};

export const generateVerificationToken = () => {
    return crypto.randomBytes(32).toString("hex");  // Geração de um token de 32 bytes
};