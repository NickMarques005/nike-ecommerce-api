import { AuthContextType } from "../../types/auth/AuthContextTypes";

export const isValidAuthContext = (value: any): value is AuthContextType => {
    return ["entrar", "criar-conta", "resetar-senha"].includes(value);
};