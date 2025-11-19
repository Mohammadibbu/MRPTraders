import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Package } from "lucide-react";
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
    <section className="relative py-20  bg-gray-50 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent shadow-[0_1px_12px_0_rgba(0,0,0,0.1)]" />

      {/* ================= BACKGROUND ELEMENTS ================= */}

      {/* 1. Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-70 pointer-events-none"></div>

      {/* 2. Giant Watermark Text */}
      <div className="absolute top-20 left-10 text-[10rem] lg:text-[14rem] font-black text-gray-200/40 pointer-events-none select-none leading-none hidden lg:block">
        CATALOG
      </div>

      {/* 3. Ambient Blob */}
      <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-orange-500/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-orange-600 text-xs font-bold uppercase tracking-wider mb-6 border border-orange-100">
              <Package className="w-3 h-3" /> Premium Exports
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
              Explore Our <span className="text-primary">Global Harvest</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Handpicked fruits, vegetables, and premium staples, delivered
              across the globe with quality and freshness guaranteed.
            </p>
          </motion.div>
        </div>

        {/* Category Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <CategoryCard categoriesToDisplay={defaultCategories} />
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className=" text-center"
        >
          <Link
            to="/products"
            className="group inline-flex items-center gap-2 bg-white text-gray-900 border border-gray-200 px-8 py-4 rounded-full font-bold hover:border-primary hover:text-primary hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1"
          >
            <span>View All Products</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductSection;
