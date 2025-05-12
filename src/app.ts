import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ENV } from './config/environment';
import rootRouter from "./routes/rootRoutes";
import { errorManagementMiddleware } from "./middlewares/errorManagement";

/**
 * @App_Express_Clone_Nike
 * 
 * - Configurar middlewares
 * - Registrar rotas
 * - Exportar o app
 */

dotenv.config();

const app = express();                  // Criação de uma aplicação Express
const PORT = ENV.PORT || 5000;          // Porta do servidor

app.use(express.json());

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

// Rotas Principais da API:
app.use("/api", rootRouter);

// Middleware de tratamento de erros
app.use(errorManagementMiddleware);

// Rotas base:
app.get("/", (_req, res) => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});

export default app;