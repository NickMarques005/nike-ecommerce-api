import { UserModel } from "../../models/user.model";
import { UserData } from "../../types/user/userTypes";

/** 
 * Função para achar o usuário de acordo com o e-mail
 * */ 
export const findUserByEmail = async (email: string) => {
    return await UserModel.findOne({ email });
};

/**
 * Função para achar o usuário de acordo com o id
 *  */ 
export const findUserById = async (_id: string) => {
    return await UserModel.findById(_id);
}

/**
 * Função para achar o usuário de acordo com o uid
 *  */ 
export const findUserByUid = async (uid: string) => {
    return await UserModel.findOne({ uid });
}

/**
 * Função para criar um novo usuário
 *  */ 
export const createUser = async (userData: UserData) => {
    const user = new UserModel(userData);
    return await user.save();
};