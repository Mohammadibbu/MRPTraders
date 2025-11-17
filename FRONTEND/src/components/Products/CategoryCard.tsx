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
  return (
    <>
      {/* Categories Grid */}
      <div className="grid grid-cols-1 px-8 sm:px-5 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {categoriesToDisplay!.map((category: Category) => (
          <Link
            key={category.id}
            to={category.link}
            className="block bg-white rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden group"
          >
            {/* Image Container */}
            <div className="relative overflow-hidden h-48">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Hover Overlay Layer */}
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="bg-primary text-white px-4 py-2 rounded-md shadow-md hover:bg-primary/90 transition">
                  View Products
                </button>
              </div>
            </div>

            {/* Title */}
            <div className="p-6 text-center bg-gradient-to-b from-secondaryDark/10  to-transparent">
              <h3 className="text-xl font-semibold text-primary hover:text-primary/90 transition-colors duration-200">
                {category.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default CategoryCard;
