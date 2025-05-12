export type Audience = "Masculino" | "Feminino" | "Infantil" | "Unissex";

export interface ProductSize {
    size: string;
    quantity: number;
}

export interface ProductRating {
    rating_stars: number;
    rating_amount: number;
}

export interface ProductData {
    category: string;
    name: string;
    normalized_name: string;
    rating: ProductRating;
    description?: string;
    initial_price?: number;
    imgs: string[];
    discount: number;
    max_installments: number;
    color: string;
    sizes: ProductSize[];
    new: boolean;
    subcategory?: string;
    audience: Audience;
    combo?: string[];
}