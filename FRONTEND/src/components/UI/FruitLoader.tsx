// import React from 'react';
// import { motion } from 'framer-motion';

// interface FruitLoaderProps {
//   size?: 'sm' | 'md' | 'lg';
//   className?: string;
// }

// const FruitLoader: React.FC<FruitLoaderProps> = ({
//   size = 'md',
//   className = ''
// }) => {
//   const sizeClasses = {
//     sm: 'w-8 h-8',
//     md: 'w-16 h-16',
//     lg: 'w-24 h-24'
//   };

//   const fruits = ['🥭', '🍇', '🍊', '🥥'];

//   return (
//     <div className={`flex items-center justify-center ${className}`}>
//       <div className="relative">
//         {fruits.map((fruit, index) => (
//           <motion.div
//             key={index}
//             className={`absolute ${sizeClasses[size]} flex items-center justify-center text-2xl`}
//             initial={{ opacity: 0, scale: 0 }}
//             animate={{
//               opacity: [0, 1, 0],
//               scale: [0, 1.2, 0],
//               rotate: [0, 180, 360]
//             }}
//             transition={{
//               duration: 2,
//               delay: index * 0.5,
//               repeat: Infinity,
//               ease: "easeInOut"
//             }}
//             style={{
//               background: 'linear-gradient(135deg, #5F1A35, #CCBBAE)',
//               borderRadius: '50%',
//               filter: 'drop-shadow(0 4px 8px rgba(95, 26, 53, 0.3))'
//             }}
//           >
//             {fruit}
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FruitLoader;
