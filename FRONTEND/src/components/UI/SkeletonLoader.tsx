import React from "react";
import ShimmerEffect from "./ShimmerEffect";

interface SkeletonLoaderProps {
  type: "card" | "text" | "avatar" | "product" | "list";
  count?: number;
  className?: string;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  type,
  count = 1,
  className = "",
}) => {
  const renderSkeleton = () => {
    switch (type) {
      case "card":
        return (
          <div
            className={`bg-white rounded-xl shadow p-6 space-y-4 ${className}`}
          >
            <ShimmerEffect height="h-48" borderRadius="rounded-lg" />
            <ShimmerEffect height="h-6" width="w-3/4" />
            <ShimmerEffect height="h-4" width="w-1/2" />
            <ShimmerEffect height="h-10" borderRadius="rounded-lg" />
          </div>
        );

      case "product":
        return (
          <div
            className={`bg-white rounded-xl shadow overflow-hidden ${className}`}
          >
            <ShimmerEffect height="h-48" />
            <div className="p-6 space-y-4">
              <ShimmerEffect height="h-6" width="w-3/4" />
              <ShimmerEffect height="h-8" width="w-1/2" />
              <div className="space-y-2">
                <ShimmerEffect height="h-4" width="w-full" />
                <ShimmerEffect height="h-4" width="w-2/3" />
              </div>
              <ShimmerEffect height="h-12" borderRadius="rounded-lg" />
            </div>
          </div>
        );

      case "text":
        return (
          <div className={`space-y-2 ${className}`}>
            <ShimmerEffect height="h-4" width="w-full" />
            <ShimmerEffect height="h-4" width="w-5/6" />
            <ShimmerEffect height="h-4" width="w-4/6" />
          </div>
        );

      case "avatar":
        return (
          <div className={`flex items-center space-x-4 ${className}`}>
            <ShimmerEffect
              width="w-12"
              height="h-12"
              borderRadius="rounded-full"
            />
            <div className="space-y-2 flex-1">
              <ShimmerEffect height="h-4" width="w-1/2" />
              <ShimmerEffect height="h-3" width="w-1/3" />
            </div>
          </div>
        );

      case "list":
        return (
          <div className={`space-y-4 ${className}`}>
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg"
              >
                <ShimmerEffect
                  width="w-16"
                  height="h-16"
                  borderRadius="rounded-lg"
                />
                <div className="flex-1 space-y-2">
                  <ShimmerEffect height="h-4" width="w-3/4" />
                  <ShimmerEffect height="h-3" width="w-1/2" />
                </div>
                <ShimmerEffect
                  width="w-20"
                  height="h-8"
                  borderRadius="rounded-lg"
                />
              </div>
            ))}
          </div>
        );

      default:
        return <ShimmerEffect className={className} />;
    }
  };

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index}>{renderSkeleton()}</div>
      ))}
    </>
  );
};

export default SkeletonLoader;
