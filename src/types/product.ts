export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: ProductCategory;
  image: string;
  rating: number;
  stock: number;
  ecoScore: number; // 1-5 rating for environmental friendliness
  energyEfficiencyRating: string; // A+++ to G
}

export type ProductCategory =
  | "Solar"
  | "Smart Home"
  | "Energy Storage"
  | "LED Lighting"
  | "Water Conservation"
  | "Home Insulation"
  | "EV Charging"
  | "Smart Appliances";

export interface FilterState {
  category: ProductCategory | "All";
  priceRange: {
    min: number;
    max: number;
  };
  searchQuery: string;
  sortBy: "price_asc" | "price_desc" | "rating" | "eco_score";
} 