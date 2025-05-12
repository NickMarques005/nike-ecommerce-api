import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import { getFirebaseAuth } from "../config/firebaseConfig";

/**
 * Serviços relacionados à --autenticação via token personalizado--.
 */
export const firebase_customToken = {
    /**
     * Gera um token personalizado para autenticar um usuário via client SDK.
     * @param uid - ID do usuário
     * @returns Token JWT customizado
     */
    async generate(uid: string) {
        const firebaseAuth = getFirebaseAuth();
        return await firebaseAuth.createCustomToken(uid);
    },

    async verify(idToken: string) {
        const firebaseAuth = getFirebaseAuth();
        const decodedToken: DecodedIdToken = await firebaseAuth.verifyIdToken(idToken);
        return decodedToken;
    }
};