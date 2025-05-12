import app from "./app";
import databaseConnection from "./resources/database/connection";
import { initializeFirebase } from "./resources/firebase/config/firebaseConfig";

const PORT = process.env.PORT || 5000;

const initializeAppServices = async () => {
    // Conexão do banco de dados MongoDB
    await databaseConnection.connectDatabase();

    // Inicialização do Firebase Admin
    initializeFirebase();
    
};

const startServer = async () => {
    try {
        await initializeAppServices(); // Executa todas as configurações do app

        app.listen(PORT, () => {
            console.log(`🚀 Servidor rodando na porta ${PORT}`);
        });
    } catch (error) {
        console.error("❌ Erro ao iniciar o servidor:", error);
        process.exit(1); // Encerra o processo se algo falhar
    }
};

startServer();