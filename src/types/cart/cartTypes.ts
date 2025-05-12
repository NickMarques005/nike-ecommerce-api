import mongoose from "mongoose";

export interface CartProduct {
    productId: mongoose.Types.ObjectId;
    quantity: number;
}

export interface ICart extends Document {
    userId: String;
    products: CartProduct[];
}