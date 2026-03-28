export type SpiceLevel = "Mild" | "Medium" | "Hot" | "Extra Hot";
export type ProductType = "Mango" | "Garlic" | "Timur" | "Lemon" | "Mixed" | "Other";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;        // numeric, in ₹
  emoji: string;        // placeholder until real images land
  rating: number;       // 1–5
  spiceLevel: SpiceLevel;
  type: ProductType;
  inStock: boolean;
}
