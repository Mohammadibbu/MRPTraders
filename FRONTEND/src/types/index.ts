export interface Product {
  name: string;
  alias?: string;
  origin: string[];
  health_benefits: string[];
  category: string;
  photos: string[];
  // price: number;
  availability: string; // New field
  quality: string; // New field
  season: string; // New field
  certifications: string[]; // New field
  description?: string; // New field (Optional)
  applications?: string[]; // New field (Optional)
  why_choose_us?: string[]; // New field (Optional)
  contact_info?: string; // New field (Optional)
  id: any; // Unique product ID for navigation or referencing
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
