
// Tipagem para UID em middleware:
declare module "express-serve-static-core" {
    interface Request {
        uid?: string;
    }
}

export interface UserData {
    uid: string;
    name: string;
    email: string;
    birth?: Date;
    cpf?: string;
    cep?: string;
    avatar?: string;
    createdAt?: Date;
    updatedAt?: Date;
}