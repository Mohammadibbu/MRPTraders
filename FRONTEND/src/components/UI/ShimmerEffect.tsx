import React from 'react';

interface ShimmerEffectProps {
  width?: string;
  height?: string;
  className?: string;
  borderRadius?: string;
}

const ShimmerEffect: React.FC<ShimmerEffectProps> = ({
  width = 'w-full',
  height = 'h-4',
  className = '',
  borderRadius = 'rounded'
}) => {
  return (
    <div
      className={`${width} ${height} ${borderRadius} ${className} bg-gradient-to-r from-gray-200 via-white to-gray-200 animate-shimmer bg-[length:200%_100%]`}
    />
  );
};

export default ShimmerEffect;