import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import CategoryCard from "../Products/CategoryCard";

// Define the Category type locally if not imported, or reuse from types
interface Category {
  id: string;
  name: string;
  image: string;
  link: string;
}

const ProductSection: React.FC = () => {
  // Mock data for categories to display on Home
  const defaultCategories: Category[] = [
    {
      id: "1",
      name: "Exotic Fruits",
      image: "/Images/HomePageImages/ProductCategory/exoticfruits.jpeg",
      link: "/products/c/Exotic Fruits",
    },
    {
      id: "2",
      name: "Spices",
      image: "/Images/HomePageImages/ProductCategory/spices.jpg",
      link: "/products/c/Spices",
    },
    {
      id: "3",
      name: "Vegetables",
      image: "/Images/HomePageImages/ProductCategory/vegetables.jpeg",
      link: "/products/c/Vegetables",
    },
    {
      id: "4",
      name: "Pulses",
      image: "/Images/HomePageImages/ProductCategory/Pulses.jpg",
      link: "/products/c/Pulses",
    },
  ];

  return (
    <section className="relative py-20 sm:py-24 bg-gray-50 overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50 pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
              Explore Our <span className="text-primary">Global Exports</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Handpicked fruits, vegetables, and more, delivered across the
              globe with quality and freshness guaranteed.
            </p>
          </motion.div>
        </div>

        {/* Category Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="-mx-4 sm:-mx-6 lg:-mx-8" // Negative margin to offset CategoryCard's internal padding if necessary, or to align with container
        >
          <CategoryCard categoriesToDisplay={defaultCategories} />
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 text-center"
        >
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-white text-gray-900 border-2 border-gray-200 px-8 py-3.5 rounded-full font-bold hover:border-primary hover:text-primary transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1"
          >
            <span>View All Products</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductSection;
