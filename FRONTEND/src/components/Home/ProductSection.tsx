import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import CategoryCard from "../Products/CategoryCard";

// Define the Category type
interface Category {
  id: string;
  name: string;
  image: string;
  link: string;
}

interface ProductSectionProps {
  categories?: Category[];
}

const ProductSection: React.FC<ProductSectionProps> = () => {
  const defaultCategories: Category[] = [
    {
      id: "1",
      name: "Exotic Fruits",
      image: "/Images/HomePageImages/ProductCategory/exoticfruits.jpeg",
      link: "/products?category=Exotic Fruits",
    },
    {
      id: "2",
      name: "Spices",
      image: "/Images/HomePageImages/ProductCategory/spices.jpg",
      link: "/products?category=Spices",
    },
    {
      id: "3",
      name: "Vegetables",
      image: "/Images/HomePageImages/ProductCategory/vegetables.jpeg",
      link: "/products?category=Vegetables",
    },
    {
      id: "4",
      name: "Pulses",
      image: "/Images/HomePageImages/ProductCategory/Pulses.jpg",
      link: "/products?category=Pulses",
    },
  ];

  const categoriesToDisplay = defaultCategories;

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-100">
      <div className="max-w-7xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
          Explore Our Products Exported Worldwide
        </h2>
        <p className="text-lg max-w-2xl mx-auto text-gray-600 mb-8">
          Handpicked fruits, vegetables, and more, delivered across the globe
          with quality and freshness guaranteed.
        </p>
        <CategoryCard categoriesToDisplay={categoriesToDisplay} />
        {/* Explore All Products Button */}
        <div className="mt-8">
          <Link
            to="/products"
            className="group inline-flex items-center space-x-2 bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
          >
            <span>Explore all Products</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1.5 duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
