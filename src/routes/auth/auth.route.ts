import { Router } from "express";
import { checkUserBeforeSignInController, initAuthController, resendOtpController, signUpController, singleSignOnController, validateAuthTokenController } from "../../controllers/auth.controller";

const authRouter = Router();

// Iniciar processo de autenticação (Sign In ou Sign Up)
authRouter.post("/init", initAuthController);

// Verificar OTP e criar usuário
authRouter.post("/signup", signUpController);

// Checar usuário antes de fazer o SignIn no frontend
authRouter.post("/check-user-before-signin", checkUserBeforeSignInController);

// Validar token de autenticação
authRouter.get("/validate", validateAuthTokenController);

// Reenviar OTP para usuário
authRouter.post("/resend-otp", resendOtpController);

// Executar a validação do Single Sign On
authRouter.post("/single-sign-on", singleSignOnController);

export default authRouter;