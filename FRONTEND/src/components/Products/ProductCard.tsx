import React, { useState } from "react";
import { Product } from "../../types";
import { MapPin, ArrowRight, Package, Award } from "lucide-react";
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

  const handleMoreinfo = (e: React.MouseEvent, productid: number) => {
    e.stopPropagation(); // Prevent bubbling if you add click to parent later
    navigate(`/products/d/${productid}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4 }}
      className="h-full w-full group"
    >
      <GlassmorphismCard className="h-full flex flex-col bg-white border border-gray-200/60 rounded-2xl shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 overflow-hidden relative">
        {/* ==== IMAGE CONTAINER (Fixed Aspect Ratio) ==== */}
        <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
          <motion.img
            src={imageError ? "/Images/fallback.png" : product.photos[0].base64}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            onError={() => setImageError(true)}
          />

          {/* Overlay Gradient for text contrast if needed */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Badges Container */}
          <div className="absolute top-3 left-3 right-3 flex justify-between items-start z-10">
            {/* Availability Badge */}
            {/* <span
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] sm:text-xs font-bold shadow-sm backdrop-blur-md border border-white/10 ${
                product.availability === "In Stock"
                  ? "bg-emerald-500/90 text-white"
                  : "bg-rose-500/90 text-white"
              }`}
            >
              <Package size={12} />
              {product.availability}
            </span> */}

            {/* Quality Badge */}
            <span
              className={` truncate flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] sm:text-xs font-bold shadow-sm backdrop-blur-md border border-white/10 ${
                product.quality === "Grade A"
                  ? "bg-amber-400/90 text-white"
                  : "bg-blue-500/90 text-white"
              }`}
            >
              <Award size={12} />
              {product.quality}
            </span>
          </div>

          {/* "Quick View" Hover Overlay (Desktop) */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
            <button
              onClick={(e) => handleMoreinfo(e, product.id)}
              className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 bg-white text-gray-900 text-sm font-semibold px-5 py-2.5 rounded-full shadow-lg flex items-center gap-2 hover:bg-gray-50"
            >
              View Details
            </button>
          </div>
        </div>

        {/* ==== CONTENT SECTION ==== */}
        <div className="flex flex-col flex-grow p-4 sm:p-5 md:p-6">
          {/* Title */}
          <div className="mb-2 sm:mb-3">
            <h3
              onClick={(e) => handleMoreinfo(e, product.id)}
              className="text-base sm:text-lg md:text-xl font-bold text-gray-800 leading-tight line-clamp-2 group-hover:text-primary transition-colors cursor-pointer"
            >
              {product.name}
            </h3>
          </div>

          {/* Metadata (Origin) */}
          <div className="flex items-start gap-2 mb-4 sm:mb-6">
            <MapPin className="w-4 h-4 text-dustyTaupe mt-0.5 shrink-0" />
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
              <span className="font-medium text-gray-700">Origin: </span>
              {product.origin.length > 2 ? (
                <span>
                  {product.origin.slice(0, 2).join(", ")}{" "}
                  <span className="text-gray-400 text-[10px] bg-gray-100 px-1.5 py-0.5 rounded-full whitespace-nowrap ml-1">
                    +{product.origin.length - 2} more
                  </span>
                </span>
              ) : (
                product.origin.join(", ")
              )}
            </p>
          </div>

          {/* Action Footer - Pushed to bottom using mt-auto */}
          <div className="mt-auto pt-4 border-t border-gray-100">
            <button
              onClick={(e) => handleMoreinfo(e, product.id)}
              className="w-full group/btn relative overflow-hidden rounded-xl bg-primary text-white px-4 py-2.5 sm:py-3 transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 flex items-center justify-center gap-2"
            >
              <span className="text-sm font-medium relative z-10">
                Inquire Now
              </span>
              <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover/btn:translate-x-1" />

              {/* Button Hover Effect */}
              <div className="absolute inset-0 bg-black/10 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform origin-left duration-300" />
            </button>
          </div>
        </div>
      </GlassmorphismCard>
    </motion.div>
  );
};

export default ProductCard;
