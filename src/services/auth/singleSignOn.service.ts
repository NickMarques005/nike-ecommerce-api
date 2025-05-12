
import { createUser, findUserByEmail } from "../../repositories/user/user.repository";
import { firebase_customToken } from "../../resources/firebase/services/customToken";
import { SSOCredentials } from "../../types/auth/AuthCredentialTypes";
import { UserData } from "../../types/user/userTypes";
import { UnauthorizedError } from "../../utils/errors";

/**
 * Serviço de autenticação Single Sign-On
 */
export const singleSignOnService = async (idToken: string, credentials: SSOCredentials) => {
    // 1. Verificar ID Token com Firebase
    const decoded = await firebase_customToken.verify(idToken);

    if (!decoded || decoded.uid !== credentials.uid) {
        throw new UnauthorizedError("ID Token inválido ou UID não corresponde.");
    }

    // 2. Buscar usuário por e-mail
    let user = await findUserByEmail(credentials.email);

    // 3. Criar usuário se não existir
    if (!user) {
        const userData: UserData = {
            name: credentials.name,
            email: credentials.email,
            avatar: credentials.avatar,
            uid: credentials.uid
        };

        try{
            user = await createUser(userData);
        }
        catch(err)
        {
            console.error("Erro ao criar usuário: ", err);
        }
        
    }

};