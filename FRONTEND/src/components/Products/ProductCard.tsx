import React, { useState } from "react";
import { Product } from "../../types";
import { MapPin, ArrowRight, Award } from "lucide-react";
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
    e.stopPropagation();
    navigate(`/products/d/${productid}`);
  };
  const [productname, ShortDescription] = product?.name
    ? product.name
        .split("(")
        .map((part, index) =>
          index === 1 ? part.replace(")", "").trim() : part.trim()
        )
    : ["", ""];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4 }}
      className="h-full w-full group"
    >
      <GlassmorphismCard className="h-full flex flex-col bg-white border border-gray-200/60 rounded-2xl shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 overflow-hidden relative">
        {/* ==== IMAGE CONTAINER ==== */}
        <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-50">
          <motion.img
            src={imageError ? "/Images/fallback.png" : product.photos[0].base64}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            onError={() => setImageError(true)}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Floating Badges */}
          <div className="absolute top-3 left-3 right-3 flex justify-between items-start z-10">
            <div className="ml-auto backdrop-blur-md bg-secondaryDark/30 border border-secondaryDark/10 text-white px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
              <Award
                size={14}
                className={
                  product.quality === "Grade A"
                    ? "text-amber-500"
                    : "text-blue-500"
                }
              />
              <span className="text-[10px] font-bold tracking-wide uppercase text-white drop-shadow-sm">
                {product.quality}
              </span>
            </div>
          </div>

          {/* Hover Button */}
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
        <div className="flex flex-col flex-grow p-4 sm:p-5">
          <div className="mb-3">
            <h3
              onClick={(e) => handleMoreinfo(e, product.id)}
              className="text-base sm:text-lg font-bold text-gray-800 leading-tight line-clamp-2 group-hover:text-primary transition-colors cursor-pointer"
            >
              {productname || product.name || "product"}
            </h3>

            {ShortDescription && (
              <p className="text-sm font-medium text-gray-500 mt-1  line-clamp-2">
                {ShortDescription}
              </p>
            )}
          </div>

          {/* ---- ORIGIN SECTION ---- */}
          <div className="flex items-start gap-2 mb-5">
            <div className="flex items-center justify-center w-5 h-5 mt-0.5 rounded bg-gray-100 text-gray-500 shrink-0">
              <MapPin size={12} strokeWidth={2.5} />
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-medium text-gray-400 mr-0.5">
                Origin:
              </span>

              {product.origin.slice(0, 2).map((loc, i) => (
                <span
                  key={i}
                  className="inline-flex px-2 py-0.5 rounded text-[11px] font-medium bg-secondary/10 border border-primary/10 text-gray-700 whitespace-nowrap"
                >
                  {loc}
                </span>
              ))}

              {product.origin.length > 2 && (
                <span
                  className="inline-flex px-1.5 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-gray-500 "
                  title={product.origin.slice(2).join(", ")}
                >
                  +{product.origin.length - 2} more
                </span>
              )}
            </div>
          </div>
          {/* --------------------------------- */}

          {/* Action Footer */}
          <div className="mt-auto pt-4 border-t border-gray-100">
            <button
              onClick={(e) => handleMoreinfo(e, product.id)}
              className="w-full group/btn relative overflow-hidden rounded-xl bg-primary text-white px-4 py-2.5 sm:py-3 transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 flex items-center justify-center gap-2"
            >
              <span className="text-sm font-medium relative z-10">
                Inquire Now
              </span>
              <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover/btn:translate-x-1" />
              <div className="absolute inset-0 bg-black/10 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform origin-left duration-300" />
            </button>
          </div>
        </div>
      </GlassmorphismCard>
    </motion.div>
  );
};

export default ProductCard;
