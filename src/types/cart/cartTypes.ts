import mongoose from "mongoose";
import { ProductData } from "../product/productTypes";

export interface CartProduct {
    productId: mongoose.Types.ObjectId;
    quantity: number;
    selectedSize: string;
}

export interface ICart extends Document {
    userId: String;
    products: CartProduct[];
}

export interface CartProductCompleteData {
    product: ProductData;
    quantity: number;
    selectedSize: string;
}