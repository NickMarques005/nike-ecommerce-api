import mongoose from 'mongoose';
import { ENV } from '../../config/environment';

const dbURI = ENV.MONGO_URI;

const connectDatabase = async () => {
    try {
        if (dbURI) {
            const db = await mongoose.connect(dbURI);
            console.log(`(database connection) Conexão feita ao banco de dados: ${db.connection.name}`)
            if (db.connection.db) {
                console.log(`(database connection) ✅ DB conectado: ${db.connection.db?.namespace}`);
            }
            else {
                console.error("(database connection) Houve algum erro de conexão ao banco de dados inesperado");
            }
        }
        else {
            console.error("Houve um erro: a URI do banco de dados não foi configurada devidamente...");
            process.exit(1);
        }

    } catch (error) {
        console.error('(database connection) Erro ao conectar ao banco de dados:', error);
        process.exit(1);
    }
};

const databaseConnection = {
    connectDatabase,
    dbURI
}

export default databaseConnection;