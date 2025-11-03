import React, { useState } from "react";
import { ArrowLeft, Award, Shield, Truck, Phone, Mail } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { useNavigate, useParams } from "react-router-dom";
import ProductSection from "../Home/ProductSection";
import ImportExportSection from "../Home/ImportExportSection";
import Accordion from "../UI/Accordian";
import JoinUsSection from "../Home/JoinUsSection";
import { contactDetails } from "../../utils/ContactDetails";
const ProductDetails: React.FC = () => {
  const { products } = useApp();
  const { productid } = useParams();
  const navigate = useNavigate();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [imageErrorIndexes, setImageErrorIndexes] = useState<number[]>([]);

  if (!products || products.length === 0 || !productid) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
          Oops! Something went wrong.
        </h2>
        <p className="text-gray-600 mb-4">
          Could not retrieve product details. Please try again later.
        </p>
        <button
          onClick={() => navigate("/products")}
          className="bg-primary hover:bg-green-700 text-white px-5 py-2 rounded transition"
        >
          Go Back to Products
        </button>
      </div>
    );
  }

  const product = products.find((p) => p.id === productid);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
          Product Information Unavailable
        </h2>
        <p className="text-gray-600 mb-4">
          Could not retrieve product details. Please try again later.
        </p>
        <button
          onClick={() => navigate("/products")}
          className="bg-primary hover:bg-green-700 text-white px-5 py-2 rounded transition"
        >
          Go Back to Products
        </button>
      </div>
    );
  }

  const phoneNumber = contactDetails.phoneNumber;
  const handleContactUs = () => {
    const message = `Hello, I am interested in purchasing ${product.name}. Could you please provide more details?`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };
  const handleCallUs = () => {
    window.location.href = `tel:${phoneNumber}`;
  };
  const handleImageError = (index: number) => {
    setImageErrorIndexes((prev) => [...prev, index]);
  };

  return (
    <div className="min-h-screen">
      {/* Back Button */}
      <div className="bg-secondary/30">
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <button
              onClick={() => navigate("/products")}
              className="flex items-center text-secondaryDark border-2 rounded px-3 py-2 hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Products
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8   py-12">
          <div className="grid lg:grid-cols-2 gap-12 mb-12">
            {/* Left Column: Images */}
            <div className="space-y-8">
              {/* Main Image */}
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-5 flex items-center justify-center mb-6">
                <img
                  src={
                    imageErrorIndexes.includes(selectedImageIndex)
                      ? "/Images/fallback.png"
                      : product.photos[selectedImageIndex]?.base64
                  }
                  alt={`${product.name} - Image ${selectedImageIndex + 1}`}
                  className="w-full max-h-[400px] object-contain rounded-md"
                  onError={() => handleImageError(selectedImageIndex)}
                />
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-4">
                {product.photos.map((photo, i) => (
                  <div
                    key={i}
                    onClick={() => setSelectedImageIndex(i)}
                    className={`bg-gray-100 rounded-lg p-2 flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-secondaryDark transition-all ${
                      selectedImageIndex === i ? "ring-4 ring-primary" : ""
                    }`}
                  >
                    <img
                      src={
                        imageErrorIndexes.includes(i)
                          ? "/Images/fallback.png"
                          : photo.base64
                      }
                      alt={`${product.name} thumbnail ${i + 1}`}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded"
                      onError={() => handleImageError(i)}
                    />
                  </div>
                ))}
              </div>

              {/* Why Choose Us */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-primary my-5">
                  Why Choose Us
                </h2>
                <ul className="space-y-2 text-lg text-gray-700">
                  {product.why_choose_us?.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Award className="w-5 h-5 sm:w-6 sm:h-6 text-primary mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
                <div className="bg-blue-50 rounded-lg p-4 flex items-start shadow-md">
                  <Truck className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">
                      Fast Delivery
                    </div>
                    <div className="text-sm text-gray-600">
                      Global shipping available
                    </div>
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-4 flex items-start shadow-md">
                  <Shield className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">
                      Quality Assured
                    </div>
                    <div className="text-sm text-gray-600">
                      Premium certified products
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Details */}
            <div className="sm:bg-white rounded-lg p-5 sm:shadow-sm flex flex-col">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-5">
                  <span className="bg-secondary text-primary px-3 py-1 rounded-full text-sm font-semibold">
                    {product.category}
                  </span>
                  {product.certifications?.length > 0 && (
                    <div className="flex items-center bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                      <Shield className="w-3 h-3 mr-1" />
                      FSSAI Certified
                    </div>
                  )}
                </div>

                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 break-words">
                  {product.name}
                </h1>

                <div className="bg-secondarylight rounded-lg p-4 mb-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <div>
                        <span className="text-sm text-gray-600 font-bold mb-4 mr-5">
                          Origin
                        </span>
                        {product?.origin?.map((val, i) => (
                          <span
                            key={i}
                            className="px-3 mx-0.5 py-1 bg-gradient-to-r from-secondary/20 to-primary/20 text-primary text-xs font-medium rounded-full border border-secondary/30 hover:from-dustyTaupe/30 hover:to-primary/30 transition-all duration-200"
                          >
                            {val}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed mb-6 break-words">
                  {product.description}
                </p>

                {/* Additional Info */}
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Applications
                </h2>
                <ul className="list-disc pl-5 text-gray-700 mb-6">
                  {product.applications?.map((app, i) => (
                    <li key={i}>{app}</li>
                  ))}
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Health Benefits
                </h2>
                <ul className="list-disc pl-5 text-gray-700 mb-6">
                  {product.health_benefits?.map((benefit, i) => (
                    <li key={i}>{benefit}</li>
                  ))}
                </ul>

                {product.certifications?.length > 0 && (
                  <>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      Certifications
                    </h2>
                    <ul className="list-disc pl-5 text-gray-700 mb-6">
                      {product.certifications.map((cert, i) => (
                        <li key={i}>{cert}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-7">
                <button
                  onClick={handleContactUs}
                  className="flex-1 bg-red-600 text-white px-6 py-4 rounded-lg font-semibold hover:bg-red-700 transition-colors shadow-lg hover:shadow-xl flex items-center justify-center"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Request Quote
                </button>
                <button
                  onClick={handleCallUs}
                  className="flex-1 border-2 border-primary text-primary px-6 py-4 rounded-lg font-semibold hover:bg-primary hover:text-white transition-all flex items-center justify-center"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProductSection />

      <ImportExportSection />

      <Accordion count={3} className="bg-secondarylight" />
      <JoinUsSection />
    </div>
  );
};

export default ProductDetails;
