import { Document } from "mongoose";
import { AuthContextType } from "../auth/AuthContextTypes";

export interface IOTPCode extends Document {
    email: string;
    otp: string;
    token: string;
    authContext: AuthContextType;
    expiresAt: Date;
    createdAt: Date;
    updatedAt: Date;
}