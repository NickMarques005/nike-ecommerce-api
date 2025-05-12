import mongoose, { Schema, model } from "mongoose";
import { IProduct, ProductRatingSchemaType, ProductSizeSchemaType } from "../types/models/productModelTypes";

/**
 * Schema de Tamanhos do Produto
 */
const sizeSchema = new Schema<ProductSizeSchemaType>(
    {
        size: String,
        quantity: Number,
    },
    { _id: false }
);

/**
 * Schema de Ratings do Produto
 */
const ratingSchema = new Schema<ProductRatingSchemaType>(
    {
        rating_stars: Number,
        rating_amount: Number,
    },
    { _id: false }
);

const ProductSchema = new Schema<IProduct>(
    {
        category: { type: String, required: true },
        subcategory: String,
        name: { type: String, required: true },
        normalized_name: { type: String, required: true },
        description: String,
        initial_price: Number,
        discount: Number,
        max_installments: Number,
        color: String,
        combo: { type: String, required: false },
        imgs: [String],
        sizes: [sizeSchema],
        new: Boolean,
        audience: {
            type: String,
            enum: ['Masculino', 'Feminino', 'Infantil', 'Unissex'],
            required: true,
        },
        rating: [ratingSchema]
    },
    { timestamps: true }
);


/**
 * Modelo de Produto
 */
export const ProductModel = model<IProduct>("Product", ProductSchema, "products");