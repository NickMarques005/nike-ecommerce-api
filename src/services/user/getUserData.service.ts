import { InternalServerError, NotFoundError } from "../../utils/errors";
import * as userRepository from "../../repositories/user/user.repository";
import { UserData } from "../../types/user/userTypes";

/**
 * Serviço para buscar os dados do usuário a partir do UID do Firebase.
 */
export const getUserDataService = async (uid: string): Promise<UserData> => {
    try {
        const user = await userRepository.findUserByUid(uid);

        if (!user) {
            throw new NotFoundError("Usuário não encontrado.");
        }

        return user;
    } catch (err) {
        if (err instanceof NotFoundError) throw err;

        console.error("Erro ao buscar usuário por UID:", err);
        throw new InternalServerError("Erro ao buscar dados do usuário.");
    }
};