import React, { useState } from "react";
import { Product } from "../../types";
import { MapPin, Award, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import GlassmorphismCard from "../UI/GlassmorphismCard";
import GradientButton from "../UI/GradientButton";

import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
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
      <GlassmorphismCard className="bg-white/95 backdrop-blur-sm border border-gray-100 overflow-hidden group h-full flex flex-col">
        <div className="relative h-48 overflow-hidden">
          <motion.img
            src={imageError ? "/Images/fallback.png" : product.photos[0].base64}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            // loading="lazy"
          />

          <div className="absolute top-4 left-4">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${
                product.availability === "In Stock"
                  ? "bg-green-500/90 text-white"
                  : "bg-red-500/90 text-white"
              }`}
            >
              {product.availability}
            </motion.span>
          </div>
          <div className="absolute top-4 right-4">
            <motion.span
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${
                product.quality === "Grade A"
                  ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-white"
                  : "bg-gradient-to-r from-blue-400 to-blue-500 text-white"
              }`}
            >
              {product.quality}
            </motion.span>
          </div>

          {/* Gradient overlay on hover */}
          {/* <motion.div
            className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0"
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          /> */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent " />
        </div>

        <div className="p-6 flex-1 flex flex-col">
          <motion.h3
            className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-300"
            whileHover={{ scale: 1.02 }}
          >
            {product.name}
          </motion.h3>
          {/* <div className="text-2xl font-bold bg-gradient-to-r from-primary to-dustyTaupe bg-clip-text text-transparent mb-4">
            {product.price}
          </div> */}

          <div className="space-y-2 mb-4 flex-1">
            <motion.div
              className="flex items-center text-gray-600 text-sm hover:text-primary transition-colors duration-200"
              whileHover={{ x: 5 }}
            >
              <MapPin className="h-4 w-4 mr-2 text-dustyTaupe" />
              <span>
                <span className="text-sm mr-2 font-medium text-gray-700">
                  Origin :
                </span>
                {product.origin.length > 2 ? (
                  <>
                    {product.origin.slice(0, 2).map((value, index) => (
                      <span key={`${value}-${index}`}>
                        {value}
                        {index === 0 ? ", " : ""}
                      </span>
                    ))}
                    <span className="text-gray-500 italic">
                      {` and ${product.origin.length - 2} more ${
                        product.origin.length - 2 === 1 ? "region" : "regions"
                      }...`}
                    </span>
                  </>
                ) : (
                  product.origin.map((value, index) => (
                    <span key={`${value}-${index}`}>
                      {value}
                      {index < product.origin.length - 1 ? ", " : ""}
                    </span>
                  ))
                )}
              </span>
            </motion.div>
            {/* <motion.div
              className="flex items-center text-gray-600 text-sm hover:text-primary transition-colors duration-200"
              whileHover={{ x: 5 }}
            >
              <Calendar className="h-4 w-4 mr-2 text-dustyTaupe" />
              <span>Season: {product.season}</span>
            </motion.div> */}
          </div>

          <div className="mb-6">
            <div className="flex items-center mb-2">
              <Award className="h-4 w-4 mr-2 text-dustyTaupe" />
              <span className="text-sm font-medium text-gray-700">
                Certifications:
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.certifications.map((cert, index) => (
                <motion.span
                  key={index}
                  className="px-3 py-1 bg-gradient-to-r from-dustyTaupe/20 to-primary/20 text-primary text-xs font-medium rounded-full border border-dustyTaupe/30 hover:from-dustyTaupe/30 hover:to-primary/30 transition-all duration-200"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {cert}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Show More Button */}
          <div className="flex justify-between flex-col items-center">
            {/* <GradientButton
              onClick={() => onAddToCart?.(product)}
              variant="primary"
              size="md"
              className="w-full mt-auto"
            >
              Add to Inquiry
            </GradientButton> */}
            <GradientButton
              variant="primary"
              size="md"
              className="w-full mt-5"
              icon={ArrowRight}
              onClick={() => handleMoreinfo(product.id)}
            >
              More Information
            </GradientButton>
          </div>
        </div>
      </GlassmorphismCard>
    </motion.div>
  );
};

export default ProductCard;
