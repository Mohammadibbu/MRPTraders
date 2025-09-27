import React, { useState, useEffect } from "react";
import SkeletonLoader from "../components/UI/SkeletonLoader";

interface ImageLoaderProps {
  src: string;
  alt?: string;
  className?: string;
  fallbackText?: string; // Optional fallback text
}

const ImageWithLoader: React.FC<ImageLoaderProps> = ({
  src,
  alt = "Image",
  className = "",
  fallbackText = "Image failed to load",
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
  }, [src]);
  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div className={`relative `}>
      {isLoading && !hasError && (
        <SkeletonLoader
          type="image"
          className="absolute top-0 left-0 w-full h-full"
        />
      )}

      {!hasError ? (
        <img
          src={src}
          alt={alt}
          onLoad={handleImageLoad}
          onError={handleImageError}
          className={`  ${className} ${isLoading ? "invisible" : "visible"}`}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center  text-gray-900 opacity-20">
          {fallbackText}
        </div>
      )}
    </div>
  );
};

export default ImageWithLoader;
