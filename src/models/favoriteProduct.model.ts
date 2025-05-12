import { Schema, model } from "mongoose";
import { IFavoriteProduct } from "../types/product/favoriteProductTypes";

const FavoriteProductSchema = new Schema<IFavoriteProduct>(
    {
        userId: {
            type: String,
            required: true,
        },
        productId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Product",
        },
    },
    { timestamps: true }
);

// Impede duplicações do mesmo produto favoritado por um mesmo usuário
FavoriteProductSchema.index({ userId: 1, productId: 1 }, { unique: true });

export const FavoriteProductModel = model<IFavoriteProduct>(
    "FavoriteProduct",
    FavoriteProductSchema
);