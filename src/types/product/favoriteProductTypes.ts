import mongoose from "mongoose";

export interface IFavoriteProduct {
    userId: string;     // Referência ao usuário
    productId: mongoose.Types.ObjectId;  // Referência ao produto
}