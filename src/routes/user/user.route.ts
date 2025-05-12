import { Router } from "express";
import { getUserDataController } from "../../controllers/user.controller";
import { authenticateUser } from "../../middlewares/authenticateUser";

const router = Router();

// Aplica o middleware de autenticação para todas as rotas do usuário
router.use(authenticateUser);

router.get("/me", getUserDataController);

export default router;