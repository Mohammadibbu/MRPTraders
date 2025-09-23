import { Product } from "../types";
// Create mock data for the products
const products: Product[] = [
  {
    name: "Toor Dal",
    alias: "Pigeon Pea / Thuvaram Paruppu",
    origin: ["Madurai", "Dindigul", "Virudhunagar", "Tirunelveli"],
    health_benefits: [
      "Rich in protein and dietary fiber",
      "Helps in digestion",
      "Provides essential vitamins (B-complex) and minerals like potassium & magnesium",
    ],
    category: "Pulses",
    photos: [
      "https://example.com/images/toor_dal_1.jpg",
      "https://example.com/images/toor_dal_2.jpg",
    ],
    // price: 120,
    availability: "In Stock",
    quality: "Grade A",
    season: "Available Year-round",
    certifications: ["Certified Organic", "FDA Approved"],
    description:
      "Toor Dal, also known as Pigeon Pea, is a staple ingredient in Indian cuisine. It is rich in protein, fiber, and essential vitamins, providing a healthy addition to your meals.",
    applications: [
      "Used in soups, curries, and stews.",
      "Used in Indian dishes like sambar, dal fry, and masoor dal.",
    ],
    why_choose_us: [
      "100% Natural and Pure.",
      "Rich in essential nutrients.",
      "Sourced from the best farms in India.",
    ],
    contact_info:
      "For bulk orders and inquiries, please contact our sales team.",
    id: 1,
  },
  {
    name: "Urad Dal",
    alias: "Black Gram / Ulundhu Paruppu",
    origin: ["Thanjavur", "Cuddalore", "Villupuram", "Tiruvannamalai"],
    health_benefits: [
      "High in protein and iron (good for energy & strength)",
      "Improves bone health",
      "Aids digestion and boosts heart health",
    ],
    category: "Pulses",
    photos: [
      "https://example.com/images/urad_dal_1.jpg",
      "https://example.com/images/urad_dal_2.jpg",
    ],
    // price: 140,
    availability: "In Stock",
    quality: "Grade A",
    season: "Available Year-round",
    certifications: ["Certified Organic", "FDA Approved"],
    description:
      "Urad Dal is a high-protein pulse used in various Indian dishes. It's rich in iron, which helps improve strength and energy levels.",
    applications: [
      "Used in making dosa, vada, idli, and various Indian snacks.",
      "Used in making dals and curries.",
    ],
    why_choose_us: [
      "High-quality, sourced from certified organic farms.",
      "Rich in protein and essential vitamins.",
    ],
    contact_info: "Contact our sales team for more information.",
    id: 2,
  },
  {
    name: "Moong Dal",
    alias: "Green Gram / Paasi Paruppu",
    origin: ["Virudhunagar", "Tirunelveli", "Vellore"],
    health_benefits: [
      "Easily digestible (ideal for all ages)",
      "Rich in antioxidants, potassium, magnesium",
      "Helps control cholesterol and weight",
    ],
    category: "Pulses",
    photos: [
      "https://example.com/images/moong_dal_1.jpg",
      "https://example.com/images/moong_dal_2.jpg",
    ],
    // price: 130,
    availability: "In Stock",
    quality: "Grade A",
    season: "Available Year-round",
    certifications: ["Certified Organic", "FDA Approved"],
    description:
      "Moong Dal is light on the stomach and rich in antioxidants. It is ideal for people of all ages and helps maintain overall health.",
    applications: [
      "Used in soups, curries, and dals.",
      "Used in Indian sweet dishes like moong dal halwa.",
    ],
    why_choose_us: [
      "Rich in nutrients and antioxidants.",
      "Helps in digestion and maintaining overall health.",
    ],
    contact_info: "Get in touch with our team for more details on bulk orders.",
    id: 3,
  },
  {
    name: "Bengal Gram",
    alias: "Chana Dal / Kadalai Paruppu",
    origin: ["Salem", "Namakkal", "Krishnagiri", "Dharmapuri"],
    health_benefits: [
      "Excellent protein source for vegetarians",
      "Maintains blood sugar levels",
      "Boosts immunity and digestion",
    ],
    category: "Pulses",
    photos: [
      "https://example.com/images/bengal_gram_1.jpg",
      "https://example.com/images/bengal_gram_2.jpg",
    ],
    // price: 110,
    availability: "In Stock",
    quality: "Grade A",
    season: "Available Year-round",
    certifications: ["Certified Organic", "FDA Approved"],
    description:
      "Bengal Gram is a rich source of protein, perfect for vegetarians and vegans. It helps control blood sugar and promotes immunity.",
    applications: [
      "Used in making hummus, curries, and soups.",
      "Can be roasted and eaten as a snack.",
    ],
    why_choose_us: [
      "Rich in protein and fiber.",
      "Helps regulate blood sugar and improve immunity.",
    ],
    contact_info: "Contact us for more details on customized packaging.",
    id: 4,
  },
  {
    name: "Masoor Dal",
    alias: "Red Lentil",
    origin: ["Erode", "Salem", "Tiruvannamalai"],
    health_benefits: [
      "Rich in protein, fiber, and folate",
      "Good for heart health",
      "Improves skin health and energy",
    ],
    category: "Pulses",
    photos: [
      "https://example.com/images/masoor_dal_1.jpg",
      "https://example.com/images/masoor_dal_2.jpg",
    ],
    // price: 140,
    availability: "In Stock",
    quality: "Grade A",
    season: "Available Year-round",
    certifications: ["Certified Organic", "FDA Approved"],
    description:
      "Masoor Dal, or Red Lentil, is a quick-cooking lentil that is rich in nutrients, especially folate and fiber. It supports heart health and energy levels.",
    applications: [
      "Used in making soups, curries, and dals.",
      "A great addition to vegetarian and vegan dishes.",
    ],
    why_choose_us: [
      "Rich in folate and fiber.",
      "Supports heart health and boosts energy.",
    ],
    contact_info: "Reach out to our team for bulk pricing and inquiries.",
    id: 5,
  },
  {
    name: "Horse Gram",
    alias: "Kollu",
    origin: ["Dindigul", "Karur", "Madurai", "Tirunelveli"],
    health_benefits: [
      "Aids weight loss",
      "Detoxifies the body",
      "Good for treating kidney stones and diabetes",
    ],
    category: "Pulses",
    photos: [
      "https://example.com/images/horse_gram_1.jpg",
      "https://example.com/images/horse_gram_2.jpg",
    ],
    // price: 90,
    availability: "In Stock",
    quality: "Grade A",
    season: "Available Year-round",
    certifications: ["Certified Organic", "FDA Approved"],
    description:
      "Horse Gram is a powerful pulse that helps detoxify the body, aid weight loss, and treat kidney stones. It is also good for managing diabetes.",
    applications: [
      "Used in soups, stews, and health drinks.",
      "A key ingredient in traditional Ayurvedic remedies.",
    ],
    why_choose_us: [
      "Natural detoxifier and weight loss aid.",
      "Certified organic, free from chemicals.",
    ],
    contact_info: "For bulk orders and inquiries, please contact us.",
    id: 6,
  },
  // Additional product data here...
];

const suggestions: string[] = products.map((val) => val.name);

localStorage.setItem("suggestions", JSON.stringify(suggestions));

export default products;
