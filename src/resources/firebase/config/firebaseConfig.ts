import admin from "firebase-admin";

let firebaseInitialized = false;

export const initializeFirebase = () => {
    const firebaseBase64 = process.env.FIREBASE_CREDENTIALS_BASE64;
    if (!firebaseBase64) {
        throw new Error("FIREBASE_CREDENTIALS_BASE64 não foi definido no .env");
    }

    const serviceAccount = JSON.parse(
        Buffer.from(firebaseBase64, "base64").toString("utf8")
    );

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });

    firebaseInitialized = true;
    console.log("✅ Firebase Admin inicializado com sucesso.");
};

// ✅ Função que retorna admin.auth() apenas após a inicialização
export const getFirebaseAuth = () => {
    if (!firebaseInitialized) {
        throw new Error("Firebase ainda não foi inicializado. Chame initializeFirebase() antes.");
    }
    return admin.auth();
};