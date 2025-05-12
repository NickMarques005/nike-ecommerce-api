
import { UpdateRequest } from "firebase-admin/lib/auth/auth-config";
import { getFirebaseAuth } from "../config/firebaseConfig";

/**
 * Serviços relacionados à --gestão de usuários-- no Firebase Auth.
 * Inclui criação, recuperação, atualização e exclusão de usuários.
 */
export const firebase_userManagement = {
    /**
     * Cria um novo usuário no Firebase Auth com e-mail e senha.
     * @param email - E-mail do novo usuário
     * @param password - Senha do novo usuário
     * @returns Objeto do tipo `UserRecord`
     */
    async createUser(email: string, password: string) {
        const firebaseAuth = getFirebaseAuth();
        return await firebaseAuth.createUser({ email, password });
    },

    /**
     * Recupera dados de um usuário pelo UID.
     * @param uid - ID único do usuário
     * @returns Objeto do tipo `UserRecord`
     */
    async getUserByUid(uid: string) {
        const firebaseAuth = getFirebaseAuth();
        return await firebaseAuth.getUser(uid);
    },

    /**
     * Recupera dados de um usuário pelo e-mail.
     * @param email - E-mail do usuário
     * @returns Objeto do tipo `UserRecord`
     */
    async getUserByEmail(email: string) {
        const firebaseAuth = getFirebaseAuth();
        return await firebaseAuth.getUserByEmail(email);
    },

    /**
     * Atualiza o e-mail e/ou senha de um usuário.
     * @param uid - ID do usuário
     * @param email - Novo e-mail (opcional)
     * @param password - Nova senha (opcional)
     * @returns Objeto atualizado do tipo `UserRecord`
     */
    async updateUser(uid: string, email?: string, password?: string) {
        const firebaseAuth = getFirebaseAuth();
        return await firebaseAuth.updateUser(uid, { email, password });
    },

    /**
    * Atualiza campos específicos de um usuário no Firebase Auth.
    * @param uid - ID do usuário
    * @param data - Objeto parcial contendo os campos a serem atualizados
    * @returns Objeto atualizado do tipo `UserRecord`
    */
    async updateUserFields(uid: string, data: UpdateRequest) {
        const firebaseAuth = getFirebaseAuth();
        return await firebaseAuth.updateUser(uid, data);
    },

    /**
     * Exclui permanentemente um usuário do Firebase Auth.
     * @param uid - ID do usuário
     */
    async deleteUser(uid: string) {
        const firebaseAuth = getFirebaseAuth();
        await firebaseAuth.deleteUser(uid);
        console.log("Usuário deletado com sucesso do Firebase");
    }
};