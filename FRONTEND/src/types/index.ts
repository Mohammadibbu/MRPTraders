export interface Product {
  id: string;
  name: string;
  price: string;
  availability: string;
  quality: string;
  certifications: string[];
  photos: string[];
  origin: string;
  season: string;
  category: 'imports' | 'exports';
}

export interface User {
  id: number;
  role: 'client' | 'seller' | 'admin';
  name: string;
  email: string;
  order_history?: string[];
  notifications?: string[];
  products?: string[];
  sales_report?: {
    product: string;
    sales: number;
    revenue: string;
  }[];
}

export interface Order {
  id: string;
  productId: string;
  quantity: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  date: string;
  total: string;
}