export type SpiceLevel = "Mild" | "Medium" | "Hot" | "Extra Hot";
export type ProductType = "Mango" | "Garlic" | "Timur" | "Lemon" | "Mixed" | "Other";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;        // small 200g price in Rs
  largePrice: number;   // large 400g price in Rs
  image: string;        // image path
  rating: number;       // 1–5
  spiceLevel: SpiceLevel;
  type: ProductType;
  inStock: boolean;
}
