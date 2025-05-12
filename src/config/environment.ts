import dotenv from 'dotenv';
import path from 'path';

// Carrega o .env da raiz
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI não está definida no arquivo .env");
}

if (!process.env.PORT) {
    throw new Error("PORT não está definida no arquivo .env");
}

export const ENV = {
    MONGO_URI: process.env.MONGO_URI,
    PORT: process.env.PORT,
};