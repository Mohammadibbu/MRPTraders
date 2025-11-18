export interface Product {
  id: any; // Unique product ID (kept as any per your request, but number is recommended)
  name: string;
  alias?: string;
  origin: string[];
  health_benefits: string[];
  category: string;
  photos: { base64: string; size: number }[];

  // Core Details
  availability: string;
  quality?: string;
  season?: string;
  certifications: string[];
  description?: string;

  // Extended Info
  applications?: string[];
  why_choose_us?: string[];
  contact_info?: string;

  // New Specification Fields (Added for the Product Details UI)
  shelf_life?: string;
  storage_conditions?: string;
  best_shipment_modes?: string;
}

// export interface User {
//   id: number;
//   role: "client" | "seller" | "admin";
//   name: string;
//   email: string;
//   order_history?: string[];
//   notifications?: string[];
//   products?: string[];
//   sales_report?: {
//     product: string;
//     sales: number;
//     revenue: string;
//   }[];
// }

// export interface Order {
//   id: string;
//   productId: string;
//   quantity: number;
//   status: "pending" | "confirmed" | "shipped" | "delivered";
//   date: string;
//   total: string;
// }

export type Category = {
  id: string;
  name: string;
  createdAt?: { _seconds: number; _nanoseconds: number };
  productIds?: string[] | undefined;
  photos?: { base64: string }[];
  description?: string;
};
