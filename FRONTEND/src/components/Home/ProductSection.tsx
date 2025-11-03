import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

// Define the Category type
interface Category {
  id: number;
  name: string;
  image: string;
  link: string;
}

interface ProductSectionProps {
  categories?: Category[];
}

const ProductSection: React.FC<ProductSectionProps> = () => {
  const defaultCategories: Category[] = [
    {
      id: 1,
      name: "Exotic Fruits",
      image: "/Images/HomePageImages/ProductCategory/exoticfruits.jpeg",
      link: "/products?category=Exotic Fruits",
    },
    {
      id: 2,
      name: "Spices",
      image: "/Images/HomePageImages/ProductCategory/spices.jpg",
      link: "/products?category=Spices",
    },
    {
      id: 3,
      name: "Vegetables",
      image: "/Images/HomePageImages/ProductCategory/vegetables.jpeg",
      link: "/products?category=Vegetables",
    },
    {
      id: 4,
      name: "Pulses",
      image: "/Images/HomePageImages/ProductCategory/Pulses.jpg",
      link: "/products?category=Pulses",
    },
  ];

  const categoriesToDisplay = defaultCategories;

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
          Explore Our Products Exported Worldwide
        </h2>
        <p className="text-lg max-w-2xl mx-auto text-gray-600 mb-8">
          Handpicked fruits, vegetables, and more, delivered across the globe
          with quality and freshness guaranteed.
        </p>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {categoriesToDisplay.map((category) => (
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
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold text-primary hover:text-primary/90 transition-colors duration-200">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        {/* Explore All Products Button */}
        <div className="mt-8">
          <Link
            to="/products"
            className="group inline-flex items-center space-x-2 bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
          >
            <span>Explore all Products</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1.5 duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
