import { ArrowRight, Sparkles } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

// --- Types ---
export type Category = {
  id: string;
  name: string;
  image: string;
  link: string;
  itemCount?: number;
};

type CategoryCardProps = {
  categoriesToDisplay: Category[] | undefined;
  isLoading?: boolean;
};

// --- Animations ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, scale: 0.9 },
};

// --- Sub-Component: Skeleton Loader ---
const CategorySkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
    {[1, 2, 3, 4].map((i) => (
      <div
        key={i}
        className="rounded-2xl overflow-hidden border border-gray-100 bg-white h-full"
      >
        <div className="aspect-[4/3] bg-gray-200 animate-pulse" />
        <div className="p-5 space-y-3">
          <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
        </div>
      </div>
    ))}
  </div>
);

const CategoryCard: React.FC<CategoryCardProps> = ({
  categoriesToDisplay,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <section className="w-full py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <CategorySkeleton />
      </section>
    );
  }

  if (!categoriesToDisplay || categoriesToDisplay.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <Sparkles className="w-10 h-10 mb-4 opacity-50" />
        <p>No categories found.</p>
      </div>
    );
  }

  return (
    <section className="w-full py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {categoriesToDisplay.map((category) => (
              <motion.div
                key={category.id}
                layout
                variants={cardVariants}
                exit="exit"
                className="h-full"
              >
                <Link
                  to={category.link}
                  className="group relative flex flex-col h-full bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Image Container */}
                  <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      loading="lazy"
                    />

                    {/* Gradient Overlay  */}
                    <div className="absolute inset-0 bg-gradient-to-t from-secondaryDark/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Optional Badge */}
                    {category.itemCount !== undefined && (
                      <div
                        className={`sm:-translate-y-10 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 
      transition-all duration-300 absolute top-3 left-3 backdrop-blur-sm 
      px-2.5 py-1 rounded-full text-xs font-semibold shadow-sm border border-white/20 bg-secondaryDark/40
      ${category.itemCount === 0 ? "text-gray-300 " : "text-secondarylight  "}`}
                      >
                        {category.itemCount === 0
                          ? "No products – coming soon"
                          : category.itemCount === 1
                            ? "1 product"
                            : `${category.itemCount} products`}
                      </div>
                    )}

                    {/* Hover Action Button  */}
                    <div className="absolute bottom-3 right-3 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10">
                      <div className="bg-white text-primary p-2.5 rounded-full shadow-lg">
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>

                  {/* Content Section  */}
                  <div className="flex flex-col p-5">
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-1">
                        {category.name}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-500 mt-1 font-medium group-hover:text-primary/80 transition-colors flex items-center">
                      Explore Collection
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default CategoryCard;
