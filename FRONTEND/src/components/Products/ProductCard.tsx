import React from "react";
import { Product } from "../../types";
import { Badge, MapPin, Calendar, Award } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="relative h-48 overflow-hidden">
        <img
          src={product.photos[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              product.availability === "In Stock"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {product.availability}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              product.quality === "Grade A"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-blue-100 text-blue-800"
            }`}
          >
            {product.quality}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
        <div className="text-2xl font-bold text-primary mb-4">
          {product.price}
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin className="h-4 w-4 mr-2 text-[#CCBBAE]" />
            <span>Origin: {product.origin}</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <Calendar className="h-4 w-4 mr-2 text-[#CCBBAE]" />
            <span>Season: {product.season}</span>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center mb-2">
            <Award className="h-4 w-4 mr-2 text-[#CCBBAE]" />
            <span className="text-sm font-medium text-gray-700">
              Certifications:
            </span>
          </div>
          <div className="flex flex-wrap gap-1">
            {product.certifications.map((cert, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-[#CCBBAE] bg-opacity-20 text-primary text-xs font-medium rounded-full"
              >
                {cert}
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={() => onAddToCart?.(product)}
          className="w-full bg-gradient-to-r from-primary to-[#CCBBAE] text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
        >
          Add to Inquiry
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
