import { Document } from "mongoose";

export interface IUser extends Document {
    uid: string;
    name: string;
    email: string;
    birth?: Date;
    cpf?: string;
    cep?: string;
    avatar: string;
    createdAt: Date;
    updatedAt: Date;
}