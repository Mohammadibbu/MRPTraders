import React, { useState } from "react";
import { ImageOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SkeletonLoader from "../components/UI/SkeletonLoader";

interface ImageLoaderProps {
  src: string;
  alt?: string;
  className?: string; // Applied to the outer container (width, height, positioning)
  imageClassName?: string; // Applied specifically to the img tag
  fallbackText?: string;
}

const ImageWithLoader: React.FC<ImageLoaderProps> = ({
  src,
  alt = "Image",
  className = "",
  imageClassName = "object-cover",
  fallbackText = "Image unavailable",
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-gray-100 ${className}`}>
      {/* Skeleton Loader (Visible while loading) */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-10"
          >
            <SkeletonLoader type="image" className="w-full h-full" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error State */}
      {hasError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 text-gray-400 p-4 text-center border border-gray-200">
          <ImageOff className="w-8 h-8 mb-2 opacity-50" />
          <span className="text-xs font-medium">{fallbackText}</span>
        </div>
      ) : (
        /* Actual Image */
        <motion.img
          src={src}
          alt={alt}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoading ? 0 : 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
          className={`block w-full h-full ${imageClassName}`}
          loading="lazy"
        />
      )}
    </div>
  );
};

export default ImageWithLoader;
