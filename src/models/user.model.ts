import { Schema, model } from "mongoose";
import { IUser } from "../types/models/userModelTypes";

const UserSchema = new Schema<IUser>(
    {
        uid: { type: String, required: true },
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        birth: { type: Date, required: false },
        cpf: { type: String, required: false},
        cep: { type: String, required: false},
        avatar: { type: String, default: ""}
    },
    { timestamps: true }
);

export const UserModel = model<IUser>("User", UserSchema);