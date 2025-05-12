import mongoose, { Schema, Document } from "mongoose";
import { ICart } from "../types/cart/cartTypes";

const cartSchema = new Schema<ICart>({
    userId: { type: String, required: true, unique: true },
    products: [
        {
            productId: { type: mongoose.Types.ObjectId, required: true, ref: "Product" },
            quantity: { type: Number, required: true, min: 1 },
        },
    ],
},
    { timestamps: true }
);

export const CartModel = mongoose.model<ICart>("Cart", cartSchema);
