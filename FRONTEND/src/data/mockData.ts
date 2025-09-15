import { Product, User } from '../types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Rambutan',
    price: '$5.00',
    availability: 'In Stock',
    quality: 'Grade A',
    certifications: ['ISO', 'FSSAI'],
    photos: ['https://images.pexels.com/photos/4963429/pexels-photo-4963429.jpeg'],
    origin: 'Thailand',
    season: 'May-July',
    category: 'imports'
  },
  {
    id: '2',
    name: 'Durian',
    price: '$8.00',
    availability: 'In Stock',
    quality: 'Grade A',
    certifications: ['FSSAI'],
    photos: ['https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg'],
    origin: 'Malaysia',
    season: 'June-August',
    category: 'imports'
  },
  {
    id: '3',
    name: 'Mangosteen',
    price: '$6.50',
    availability: 'In Stock',
    quality: 'Grade A',
    certifications: ['ISO', 'Organic'],
    photos: ['https://images.pexels.com/photos/5793953/pexels-photo-5793953.jpeg'],
    origin: 'Thailand',
    season: 'May-September',
    category: 'imports'
  },
  {
    id: '4',
    name: 'Dragon Fruit',
    price: '$4.00',
    availability: 'In Stock',
    quality: 'Grade B',
    certifications: ['FSSAI', 'Organic'],
    photos: ['https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg'],
    origin: 'Vietnam',
    season: 'Year-round',
    category: 'imports'
  },
  {
    id: '5',
    name: 'Premium Basmati Rice',
    price: '$4.50',
    availability: 'In Stock',
    quality: 'Grade A',
    certifications: ['ISO', 'Organic'],
    photos: ['https://images.pexels.com/photos/3656477/pexels-photo-3656477.jpeg'],
    origin: 'India',
    season: 'Year-round',
    category: 'exports'
  },
  {
    id: '6',
    name: 'Mixed Pulses',
    price: '$3.50',
    availability: 'In Stock',
    quality: 'Grade B',
    certifications: ['Organic'],
    photos: ['https://images.pexels.com/photos/4397923/pexels-photo-4397923.jpeg'],
    origin: 'India',
    season: 'Year-round',
    category: 'exports'
  },
  {
    id: '7',
    name: 'Wheat Grains',
    price: '$2.80',
    availability: 'In Stock',
    quality: 'Grade A',
    certifications: ['ISO', 'FSSAI'],
    photos: ['https://images.pexels.com/photos/4110004/pexels-photo-4110004.jpeg'],
    origin: 'India',
    season: 'Year-round',
    category: 'exports'
  }
];

export const mockUsers: User[] = [
  {
    id: 1,
    role: 'client',
    name: 'John Doe',
    email: 'john@example.com',
    order_history: ['order_001', 'order_002'],
    notifications: ['Order shipped', 'New product in stock']
  },
  {
    id: 2,
    role: 'seller',
    name: 'Jane Smith',
    email: 'jane@example.com',
    products: ['rambutan', 'durian'],
    sales_report: [
      {
        product: 'Rambutan',
        sales: 100,
        revenue: '$500'
      }
    ]
  },
  {
    id: 3,
    role: 'admin',
    name: 'Admin User',
    email: 'admin@mrpglobal.com'
  }
];