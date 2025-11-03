import React, { useState } from "react";
import { Product } from "../../types";
import { MapPin, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import GlassmorphismCard from "../UI/GlassmorphismCard";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();

  const handleMoreinfo = (productid: number) => {
    navigate(`/products/${productid}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="h-full"
    >
      <GlassmorphismCard className="bg-white/95 backdrop-blur-sm border border-gray-100 overflow-hidden group h-full flex flex-col rounded-lg shadow-sm transition-all hover:shadow-lg">
        {/* ==== IMAGE SECTION WITH HOVER OVERLAY ==== */}
        <div className="relative h-40 sm:h-48 md:h-40 lg:h-40 overflow-hidden">
          <motion.img
            src={imageError ? "/Images/fallback.png" : product.photos[0].base64}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={() => setImageError(true)}
          />

          {/* Availability Badge */}
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`px-2 py-1 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold backdrop-blur-sm ${
                product.availability === "In Stock"
                  ? "bg-green-500/90 text-white"
                  : "bg-red-500/90 text-white"
              }`}
            >
              {product.availability}
            </motion.span>
          </div>

          {/* Quality Badge */}
          <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
            <motion.span
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`px-2 py-1 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold backdrop-blur-sm ${
                product.quality === "Grade A"
                  ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-white"
                  : "bg-gradient-to-r from-blue-400 to-blue-500 text-white"
              }`}
            >
              {product.quality}
            </motion.span>
          </div>

          {/* Hover Overlay Layer */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors flex items-center justify-center">
            <button
              onClick={() => handleMoreinfo(product.id)}
              className="bg-secondarylight text-gray-900 text-sm sm:text-base px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg font-semibold opacity-0 group-hover:opacity-100 transform translate-y-3 group-hover:translate-y-0 transition-all flex items-center"
            >
              View Details
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>

        {/* ==== PRODUCT DETAILS SECTION ==== */}
        <div className="p-4 sm:p-5 md:p-6 flex-1 flex flex-col justify-between">
          {/* Product Name */}
          <motion.h3
            className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-2"
            whileHover={{ scale: 1.02 }}
          >
            {product.name}
          </motion.h3>

          {/* Product Origin */}
          <div className="mb-3 sm:mb-4 flex-1">
            <motion.div
              className="flex items-start text-gray-600 text-xs sm:text-sm leading-relaxed"
              whileHover={{ x: 5 }}
            >
              <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-dustyTaupe shrink-0 mt-[2px]" />
              <span>
                <span className="font-medium text-gray-700">Origin:</span>{" "}
                {product.origin.length > 2 ? (
                  <>
                    {product.origin.slice(0, 2).join(", ")}{" "}
                    <span className="text-gray-500 italic">
                      and {product.origin.length - 2} more{" "}
                      {product.origin.length - 2 === 1 ? "region" : "regions"}
                      ...
                    </span>
                  </>
                ) : (
                  product.origin.join(", ")
                )}
              </span>
            </motion.div>
          </div>

          {/* Inquire Now Button */}
          <div className="mt-auto flex justify-end">
            <button
              onClick={() => handleMoreinfo(product.id)}
              className="bg-primary text-white text-sm  flex items-center text-center px-5 sm:px-4 py-1.5 sm:py-2 rounded-lg font-semibold hover:bg-red-700 transition-all duration-200"
            >
              Inquire Now
              <ArrowRight className="w-4 h-4 ml-1 sm:ml-2" />
            </button>
          </div>
        </div>
      </GlassmorphismCard>
    </motion.div>
  );
};

export default ProductCard;
