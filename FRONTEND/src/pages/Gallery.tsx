import React, { useState } from "react";
import { X, ZoomIn } from "lucide-react";

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const galleryImages = [
    {
      id: 1,
      src: "https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg",
      alt: "Tropical fruit farm",
      category: "Farms",
    },
    {
      id: 2,
      src: "https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg",
      alt: "Fresh durian harvest",
      category: "Harvest",
    },
    {
      id: 3,
      src: "https://images.pexels.com/photos/4963429/pexels-photo-4963429.jpeg",
      alt: "Rambutan processing",
      category: "Processing",
    },
    {
      id: 4,
      src: "https://images.pexels.com/photos/8838740/pexels-photo-8838740.jpeg",
      alt: "Logistics and shipping",
      category: "Logistics",
    },
    {
      id: 5,
      src: "https://images.pexels.com/photos/4397923/pexels-photo-4397923.jpeg",
      alt: "Pulse processing facility",
      category: "Processing",
    },
    {
      id: 6,
      src: "https://images.pexels.com/photos/3656477/pexels-photo-3656477.jpeg",
      alt: "Rice packaging",
      category: "Packaging",
    },
    {
      id: 7,
      src: "https://images.pexels.com/photos/4110004/pexels-photo-4110004.jpeg",
      alt: "Wheat farm",
      category: "Farms",
    },
    {
      id: 8,
      src: "https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg",
      alt: "Dragon fruit plantation",
      category: "Farms",
    },
  ];

  const categories = [
    "All",
    "Farms",
    "Harvest",
    "Processing",
    "Packaging",
    "Logistics",
  ];
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredImages =
    activeCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-secondary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Gallery</h1>
          <p className="text-xl text-gray-200">
            A visual journey through our farms, logistics, and quality processes
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeCategory === category
                  ? "bg-primary text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => setSelectedImage(image.src)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                <ZoomIn className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                <p className="text-white text-sm font-medium">{image.alt}</p>
                <span className="text-xs text-gray-300">{image.category}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-gray-600">Hectares Under Cultivation</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">25+</div>
              <div className="text-gray-600">Product Varieties</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">99%</div>
              <div className="text-gray-600">Quality Success Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Image Preview */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-6xl max-h-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X className="h-8 w-8" />
            </button>
            <img
              src={selectedImage}
              alt="Gallery preview"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
