import { Document } from "mongoose";
import { Audience } from "../product/productTypes";

export interface ProductSizeSchemaType {
    size: any; // string | number, dependendo do produto
    quantity: number;
}

export interface ProductRatingSchemaType {
    rating_stars: number;
    rating_amount: number;
}

export interface IProduct {
    category: string;
    name: string;
    normalized_name: string;
    rating: ProductRatingSchemaType;
    description?: string;
    initial_price?: number;
    imgs: string[];
    discount: number;
    max_installments: number;
    color: string;
    sizes: ProductSizeSchemaType[];
    new: boolean;
    subcategory?: string;
    audience: Audience;
    combo?: string[];
}
