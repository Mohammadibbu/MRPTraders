import { ArrowRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

type Category = {
  id: string;
  name: string;
  image: string;
  link: string;
};

type CategoryCardProps = {
  categoriesToDisplay: Category[] | undefined;
};

const CategoryCard: React.FC<CategoryCardProps> = ({ categoriesToDisplay }) => {
  if (!categoriesToDisplay || categoriesToDisplay.length === 0) {
    return null;
  }

  return (
    <section className="w-full py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
          {categoriesToDisplay.map((category) => (
            <Link
              key={category.id}
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

                {/* Gradient Overlay (Subtle dark gradient at bottom for text contrast if we placed text over image, mostly for aesthetics here) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Hover Action Button */}
                <div className="absolute bottom-3 right-3 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10">
                  <div className="bg-white text-primary p-2.5 rounded-full shadow-lg">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Content Section */}
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryCard;
