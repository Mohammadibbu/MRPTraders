import React, { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useApp } from "../context/AppContext";
import ProductCard from "../components/Products/ProductCard";
import ProductFilter from "../components/Products/ProductFilter";
import { Product } from "../types";

const ProductListings: React.FC = () => {
  const { category } = useParams<{ category: "imports" | "exports" }>();
  const { products, searchTerm } = useApp();

  const [filters, setFilters] = useState({
    category: category || "all",
    origin: "All",
    season: "All",
    certification: "All",
    quality: "All",
  });

  const filteredProducts = useMemo(() => {
    return products.filter((product: Product) => {
      // Category filter
      if (category && product.category !== category) return false;

      // Search filter
      if (
        searchTerm &&
        !product.name.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }

      // Other filters
      if (filters.origin !== "All" && product.origin !== filters.origin)
        return false;
      if (filters.season !== "All" && product.season !== filters.season)
        return false;
      if (
        filters.certification !== "All" &&
        !product.certifications.includes(filters.certification)
      )
        return false;
      if (filters.quality !== "All" && product.quality !== filters.quality)
        return false;

      return true;
    });
  }, [products, category, searchTerm, filters]);

  const handleAddToCart = (product: Product) => {
    // In a real app, this would add to cart/inquiry
    alert(`Added ${product.name} to inquiry list!`);
  };

  const categoryTitle =
    category === "imports" ? "Import Products" : "Export Products";
  const categoryDescription =
    category === "imports"
      ? "Premium tropical fruits and exotic produce from Southeast Asia"
      : "High-quality grains, pulses, and agricultural products from India";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-secondary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            {categoryTitle}
          </h1>
          <p className="text-xl text-gray-200">{categoryDescription}</p>
          <div className="mt-6 text-white">
            <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
              {filteredProducts.length} products found
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ProductFilter filters={filters} onFilterChange={setFilters} />

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 text-xl mb-4">No products found</div>
            <p className="text-gray-400">
              Try adjusting your filters or search terms
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListings;
