import { deleteOtpCodeByEmail, verifyOtpCode } from "../../repositories/auth/otp.repository";
import { createUser } from "../../repositories/user/user.repository";
import { firebase_userManagement } from "../../resources/firebase/services/userManagement";
import { AuthContextType } from "../../types/auth/AuthContextTypes";
import { SignUpCredentials } from "../../types/auth/AuthCredentialTypes";
import { UserData } from "../../types/user/userTypes";
import { isoStringToDate } from "../../utils/date/dateConversions";
import { BadRequestError, InternalServerError, UnprocessableEntityError } from "../../utils/errors";

export const signUpService = async (
    data: SignUpCredentials, 
    context: AuthContextType): Promise<void> => {
    const valid = await verifyOtpCode(data.email, data.otp_code, context);
    if (!valid) throw new UnprocessableEntityError("Código OTP inválido ou expirado.");

    const birthDate = isoStringToDate(data.birth);
    if (!birthDate) throw new BadRequestError("Data de nascimento inválida.");

    // Verificar se já existe no Firebase
    try {
        await firebase_userManagement.getUserByEmail(data.email);
        throw new BadRequestError("Esse e-mail já está registrado.");
    } catch (err: any) {
        if (err.code !== "auth/user-not-found") {
            console.error("Erro ao verificar e-mail no Firebase:", err);
            throw new InternalServerError("Erro ao verificar e-mail no Firebase.");
        }
    }

    let firebaseUser;
    try {
        firebaseUser = await firebase_userManagement.createUser(data.email, data.password);

        await firebase_userManagement.updateUserFields(firebaseUser.uid, {
            emailVerified: true
        });
    } catch (error) {
        console.error("Erro ao criar usuário no Firebase:", error);
        throw new InternalServerError("Erro ao criar usuário no Firebase.");
    }

    // Criar usuário no MongoDB
    try {
        const createdUser = await createUser({
            uid: firebaseUser.uid,
            email: data.email,
            name: data.name,
            birth: birthDate,
        });

        await deleteOtpCodeByEmail(data.email);

    } catch (err) {
        console.error("Erro ao criar usuário no banco:", err);
        await firebase_userManagement.deleteUser(firebaseUser.uid);
        throw new InternalServerError("Erro ao criar usuário no banco de dados.");
    }
};