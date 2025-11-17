import React, { useState } from "react";
import { X } from "lucide-react";

interface ProductImageCellProps {
  src?: string;
  alt?: string;
}

const ProductImageCell: React.FC<ProductImageCellProps> = ({
  src = "/Images/fallback.png",
  alt = "Product image",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Image inside table cell */}

      <img
        src={src}
        alt={alt}
        onError={(e) =>
          ((e.target as HTMLImageElement).src = "/Images/fallback.png")
        }
        onClick={() => setIsOpen(true)}
        className="h-14 w-14 object-cover rounded-md cursor-pointer hover:opacity-80 transition"
      />

      {/* Fullscreen image modal */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm transition-opacity duration-200"
        >
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300"
          >
            <X className="w-6 h-6" />
          </button>

          <img
            src={src}
            alt={alt}
            className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking the image
          />
        </div>
      )}
    </>
  );
};

export default ProductImageCell;
