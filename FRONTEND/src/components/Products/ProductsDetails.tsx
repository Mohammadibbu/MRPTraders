import React, { useState, useEffect, useRef } from "react";
import {
  Leaf,
  Award,
  Calendar,
  CheckCircle,
  Phone,
  Globe,
  Zap,
  ChevronLeft,
  ChevronRight,
  Shield,
} from "lucide-react";
import MissionSection from "../Home/MissionSection";
import JoinUsSection from "../Home/JoinUsSection";
import ImportExportSection from "../Home/ImportExportSection";
import { useApp } from "../../context/AppContext";
import { useNavigate, useParams } from "react-router-dom";
import Accordion from "../UI/Accordian";

const ProductDetails: React.FC = () => {
  const { products } = useApp();
  const { productid } = useParams();
  const navigate = useNavigate();

  if (!products || !productid) {
    navigate("/products");
    return null;
  }

  const product = products.find((val) => val.id === Number(productid));

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");
  const [imageError, setImageError] = useState(false);
  const tabNavRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      const el = tabNavRef.current;
      if (!el) return;

      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
    };

    const el = tabNavRef.current;
    if (!el) return;

    checkScroll();
    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  useEffect(() => {
    setIsVisible(true);
  }, []);
  const scrollTabs = (amount: number) => {
    tabNavRef.current?.scrollBy({ left: amount, behavior: "smooth" });
  };

  const handleContactUs = () => {
    const message = `Hello, I am interested in purchasing ${product?.name}. Could you please provide more details?`;
    const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const sections = [
    { id: "overview", label: "Overview", icon: Globe },
    { id: "benefits", label: "Benefits", icon: Leaf },
    { id: "applications", label: "Applications", icon: Zap },
    { id: "certifications", label: "Certifications", icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Hero Section */}
      <section className="relative py-20">
        <div className="absolute inset-0">
          <img
            src="/Images/ProductPage.png"
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/50 to-primary/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center transform transition-all duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-medium mb-8 border border-white/20">
              <Calendar className="w-4 h-4 mr-2" />
              Season: {product?.season}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight leading-none">
              {product?.name}
            </h1>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left Section: Product Image Gallery */}
          <div
            className={`space-y-8 transform transition-all duration-1000 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-10 opacity-0"
            }`}
          >
            <div className="relative group">
              <div className="aspect-square bg-white rounded-3xl shadow-2xl overflow-hidden">
                <img
                  src={
                    imageError
                      ? "/Images/fallback.png"
                      : product?.photos[selectedImageIndex]
                  }
                  alt={`${product?.name} - Image ${selectedImageIndex + 1}`}
                  onError={() => setImageError(true)}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                {selectedImageIndex + 1} / {product?.photos.length}
              </div>
            </div>

            {/* Image Thumbnails */}
            <div className="flex gap-4 overflow-x-auto pb-2">
              {product?.photos.map((photo, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`flex-shrink-0 w-24 h-24 rounded-2xl overflow-hidden transition-all duration-300 transform hover:scale-105 ${
                    selectedImageIndex === index
                      ? "ring-4 ring-primary shadow-xl scale-105"
                      : "hover:ring-2 ring-gray-300 hover:shadow-lg"
                  }`}
                >
                  <img
                    src={imageError ? "/Images/fallback.png" : photo}
                    onError={() => setImageError(true)}
                    alt={`${product?.name} thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Section: Product Details */}
          <div
            className={`space-y-8 transform transition-all duration-1000 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-10 opacity-0"
            }`}
          >
            {/* Navigation Tabs */}
            <div className="select-none relative">
              {/* Left Arrow */}
              {canScrollLeft && (
                <button
                  onClick={() => scrollTabs(-150)}
                  className="absolute -left-3 -bottom-2 z-10 bg-white/80 hover:bg-white rounded-full shadow p-1 transition"
                >
                  <ChevronLeft className="w-5 h-5 text-primary" />
                </button>
              )}

              {/* Right Arrow */}
              {canScrollRight && (
                <button
                  onClick={() => scrollTabs(150)}
                  className="absolute -right-3 -bottom-2 z-10 bg-white/80 hover:bg-white rounded-full shadow p-1 transition"
                >
                  <ChevronRight className="w-5 h-5 text-primary" />
                </button>
              )}

              <div>
                <nav
                  ref={tabNavRef}
                  className="flex gap-4 py-4 overflow-x-auto px-10 bg-gradient-to-r from-dustyTaupe/20 to-primary/20 text-primary rounded-lg border border-dustyTaupe/30 hover:from-dustyTaupe/30 hover:to-primary/30 transition-all duration-200 whitespace-nowrap scroll-smooth"
                  style={{ WebkitOverflowScrolling: "touch" }}
                >
                  {sections.map((section) => {
                    const Icon = section.icon;
                    return (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                          activeSection === section.id
                            ? "bg-secondarylight text-primary shadow-md"
                            : "text-gray-600 hover:text-primary hover:bg-secondarylight"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        {section.label}
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Content Sections */}
            {activeSection === "overview" && (
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-primary">Overview</h2>
                <p className="text-lg text-gray-700">{product?.description}</p>
              </div>
            )}
            {activeSection === "benefits" && (
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-primary">
                  Health Benefits
                </h2>
                <ul className="space-y-2 text-lg text-gray-700">
                  {product?.health_benefits?.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-6 h-6 text-primary mr-2" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {activeSection === "applications" && (
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-primary">
                  Applications
                </h2>
                <ul className="space-y-2 text-lg text-gray-700">
                  {product?.applications?.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-6 h-6 text-primary mr-2" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {activeSection === "certifications" && (
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-primary">
                  Certifications
                </h2>
                <ul className="space-y-2 text-lg text-gray-700">
                  {product?.certifications?.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-6 h-6 text-primary mr-2" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Origin Section */}
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-primary my-5">Origin</h2>
              {product?.origin?.map((val, i) => (
                <span
                  key={i}
                  className="px-3 mx-0.5 py-1 bg-gradient-to-r from-dustyTaupe/20 to-primary/20 text-primary text-xs font-medium rounded-full border border-dustyTaupe/30 hover:from-dustyTaupe/30 hover:to-primary/30 transition-all duration-200"
                >
                  {val}
                </span>
              ))}
            </div>

            {/* Why Choose Us */}
            <div>
              <h2 className="text-3xl font-bold text-primary my-5">
                Why Choose Us
              </h2>
              <ul className="space-y-2 text-lg text-gray-700">
                {product?.why_choose_us?.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Award className="w-6 h-6 text-primary mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Us */}
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-primary">Contact Us</h2>
              <button
                onClick={handleContactUs}
                className="w-full inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-semibold rounded-full transition-all duration-300 transform hover:bg-primary/80"
              >
                <Phone className="w-5 h-5 mr-3" />
                Contact Us on WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mission, Import Export and Join Us sections */}

      <MissionSection />
      <ImportExportSection />
      <Accordion count={3} className="bg-secondarylight" />
      <JoinUsSection />
    </div>
  );
};

export default ProductDetails;
