import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Award,
  Shield,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Thermometer,
  Ship,
  CheckCircle2,
  Package,
  Share2,
  Home,
  ChevronRight,
  Leaf,
  SearchX,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { useApp } from "../../context/AppContext";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ProductSection from "../Home/ProductSection";
import ImportExportSection from "../Home/ImportExportSection";
import Accordion from "../UI/Accordian";
import JoinUsSection from "../Home/JoinUsSection";
import { contactDetails } from "../../utils/ContactDetails";

const ProductDetails: React.FC = () => {
  // Extract loading state from context to fix the refresh issue
  const { products, loading } = useApp();
  const { productid } = useParams();
  const navigate = useNavigate();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [imageErrorIndexes, setImageErrorIndexes] = useState<number[]>([]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productid]);

  // --- 1. Loading State (Skeleton UI) ---
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] pt-20 px-4 sm:px-6 lg:px-8 animate-pulse">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8">
          {/* Left Column Skeleton */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-gray-200 rounded-3xl aspect-[4/3] w-full"></div>
            <div className="flex gap-3 overflow-hidden">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-20 h-20 bg-gray-200 rounded-2xl shrink-0"
                ></div>
              ))}
            </div>
            <div className="h-40 bg-gray-200 rounded-3xl mt-8"></div>
          </div>
          {/* Right Column Skeleton */}
          <div className="lg:col-span-5 space-y-6">
            <div className="h-8 bg-gray-200 rounded-full w-1/3"></div>
            <div className="h-12 bg-gray-200 rounded-lg w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-24 bg-gray-200 rounded-2xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- 2. System Error State (Only if NOT loading and NO products) ---
  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center bg-gray-50">
        <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-sm border border-gray-100 max-w-lg w-full">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-10 h-10 text-red-500" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            Catalog Unavailable
          </h2>
          <p className="text-gray-500 mb-8 text-lg">
            We couldn't load the product data. Please check your connection.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-gray-900 hover:bg-black text-white px-6 py-4 rounded-xl transition-all font-semibold flex items-center justify-center"
          >
            <Loader2 className="mr-2 w-5 h-5" />
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  const product = products.find((p) => p.id === productid);

  // --- 3. Product Not Found State ---
  if (!product) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-[#F9FAFB] px-4">
        <div className="max-w-xl w-full text-center space-y-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center opacity-5">
              <Package size={200} />
            </div>
            <div className="relative z-10 w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center mx-auto border border-gray-100">
              <SearchX className="w-10 h-10 text-gray-400" />
            </div>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
              Product Not Found
            </h1>
            <p className="text-lg text-gray-600 max-w-md mx-auto leading-relaxed">
              The product you are looking for might have been removed or is
              temporarily unavailable.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button
              onClick={() => navigate("/products")}
              className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-primary rounded-2xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 hover:-translate-y-1"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Browse Catalog
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- Handlers ---
  const phoneNumber = contactDetails.phoneNumber;

  const handleContactUs = () => {
    const message = `Hello, I am interested in purchasing ${product.name} . Could you please provide a quote?`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleCallUs = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing", error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard");
    }
  };

  const handleImageError = (index: number) => {
    setImageErrorIndexes((prev) => [...prev, index]);
  };

  const getOriginString = (origin: string | string[]) => {
    if (Array.isArray(origin)) return origin.join(", ");
    return origin;
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans selection:bg-primary/20">
      {/* --- Breadcrumb Navigation --- */}
      <div className="bg-white/80 border-b sticky top-0 z-40 backdrop-blur-md supports-[backdrop-filter]:bg-white/60 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <nav className="flex items-center text-sm text-gray-500 font-medium">
            <button
              onClick={() => navigate("/")}
              className="hover:text-primary transition-colors p-1 rounded-md hover:bg-gray-100"
            >
              <Home className="w-4 h-4" />
            </button>
            <ChevronRight className="w-4 h-4 mx-2 text-gray-300 shrink-0" />
            <button
              onClick={() => navigate("/products")}
              className="hover:text-primary transition-colors"
            >
              Products
            </button>
            <ChevronRight className="w-4 h-4 mx-2 text-gray-300 shrink-0" />
            <span className="text-gray-900 truncate max-w-[120px] sm:max-w-xs">
              {product.name}
            </span>
          </nav>
          <button
            onClick={handleShare}
            className="p-2.5 text-gray-500 hover:text-primary hover:bg-primary/5 rounded-full transition-all active:scale-95"
            title="Share Product"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 pb-32 sm:pb-20">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* --- LEFT COLUMN: Gallery & Features --- */}
          <div className="lg:col-span-7 space-y-8">
            {/* Main Gallery Component */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-[2rem] p-2 sm:p-8 shadow-xl shadow-gray-200/50 border border-white relative overflow-hidden group"
              >
                <div className="aspect-[4/3] flex items-center justify-center bg-gray-50/50 rounded-3xl overflow-hidden  cursor-zoom-in">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={selectedImageIndex}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      src={
                        imageErrorIndexes.includes(selectedImageIndex)
                          ? "/Images/fallback.png"
                          : product.photos[selectedImageIndex]?.base64
                      }
                      alt={`${product.name} view`}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-700 ease-in-out mix-blend-multiply "
                      onError={() => handleImageError(selectedImageIndex)}
                    />
                  </AnimatePresence>
                </div>
                {/* Floating Badges */}
                <div className="absolute top-6 left-6 flex flex-col gap-2 z-10 pointer-events-none">
                  {product.availability && (
                    <motion.span
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      className="px-3 py-1.5 bg-emerald-500/90 backdrop-blur-md text-white text-[10px] sm:text-xs font-bold uppercase tracking-wide rounded-full shadow-lg shadow-emerald-500/20 flex items-center gap-1.5 w-fit"
                    >
                      <CheckCircle2 className="w-3 h-3" />
                      {product.availability}
                    </motion.span>
                  )}
                  {product.quality && (
                    <motion.span
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="px-3 py-2 bg-secondaryDark backdrop-blur-md text-white text-[10px] sm:text-xs font-bold uppercase tracking-wide rounded-full shadow-lg shadow-indigo-500/20 flex items-center gap-1.5 w-fit"
                    >
                      <Award className="w-3 h-3" />
                      {product.quality}
                    </motion.span>
                  )}
                </div>
              </motion.div>

              {/* Thumbnails */}
              <div className="flex gap-3 overflow-x-auto pb-4 pt-2 scrollbar-hide px-1 snap-x">
                {product.photos.map((photo, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImageIndex(i)}
                    className={`relative flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 transition-all duration-300 snap-start group ${
                      selectedImageIndex === i
                        ? "border-primary ring-4 ring-primary/10 shadow-lg scale-105 z-10"
                        : "border-transparent hover:border-gray-200 bg-white opacity-80 hover:opacity-100 grayscale hover:grayscale-0"
                    }`}
                  >
                    <img
                      src={
                        imageErrorIndexes.includes(i)
                          ? "/Images/fallback.png"
                          : photo.base64
                      }
                      alt={`Thumbnail ${i + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={() => handleImageError(i)}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Detailed Info Cards */}
            <div className="grid md:grid-cols-2 gap-5">
              {/* Applications */}
              {product.applications && product.applications.length > 0 && (
                <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100 h-full">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <div className="bg-blue-50 p-2.5 rounded-xl text-blue-600">
                      <Package className="w-5 h-5" />
                    </div>
                    Applications
                  </h3>
                  <ul className="space-y-3">
                    {product.applications.map((app, i) => (
                      <li
                        key={i}
                        className="flex items-start text-gray-600 text-sm sm:text-base leading-relaxed group"
                      >
                        <span className="w-1.5 h-1.5 bg-blue-300 rounded-full mt-2 mr-3 shrink-0 group-hover:bg-blue-500 transition-colors"></span>
                        {app}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Health Benefits */}
              {product.health_benefits && (
                <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100 h-full">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <div className="bg-green-50 p-2.5 rounded-xl text-green-600">
                      <Leaf className="w-5 h-5" />
                    </div>
                    Health Benefits
                  </h3>
                  <ul className="space-y-3">
                    {(Array.isArray(product.health_benefits)
                      ? product.health_benefits
                      : [product.health_benefits]
                    ).map((benefit, i) => (
                      <li
                        key={i}
                        className="flex items-start text-gray-600 text-sm sm:text-base leading-relaxed"
                      >
                        <CheckCircle2 className="w-4 h-4 text-green-500 mr-3 mt-1 shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* "Why Choose Us" REMOVED FROM HERE */}
          </div>

          {/* --- RIGHT COLUMN: Info & Specs (Sticky on Desktop) --- */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-8">
            {/* Product Header */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="text-primary font-bold text-[10px] sm:text-xs tracking-wider uppercase bg-primary/5 px-3 py-1.5 rounded-lg border border-primary/10">
                  {product.category}
                </span>
                {product.certifications?.includes("FSSAI") && (
                  <span className="text-gray-600 font-medium text-[10px] sm:text-xs flex items-center bg-white border border-gray-200 px-2.5 py-1.5 rounded-lg shadow-sm">
                    <Shield className="w-3 h-3 mr-1.5 text-green-600" /> FSSAI
                    Certified
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-[1.1]">
                {product.name}
              </h1>

              <div className="prose prose-gray">
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                  {product.description}
                </p>
              </div>
            </div>

            {/* Specs Grid - Modern Card Style */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {/* Origin */}
              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group hover:-translate-y-1">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Origin
                  </span>
                </div>
                {/* Removed truncate to show full list */}
                <p
                  className="text-gray-900 font-semibold text-sm sm:text-base leading-relaxed"
                  title={getOriginString(product.origin)}
                >
                  {getOriginString(product.origin)}
                </p>
              </div>

              {/* Shelf Life */}
              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group hover:-translate-y-1">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Shelf Life
                  </span>
                </div>
                <p className="text-gray-900 font-semibold text-sm sm:text-base">
                  {product.shelf_life || "N/A"}
                </p>
              </div>

              {/* Storage */}
              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group hover:-translate-y-1">
                <div className="flex items-center gap-2 mb-2">
                  <Thermometer className="w-4 h-4 text-purple-500 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Storage
                  </span>
                </div>
                <p className="text-gray-900 font-semibold text-sm sm:text-base leading-tight ">
                  {product.storage_conditions || "Standard"}
                </p>
              </div>

              {/* Shipment */}
              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group hover:-translate-y-1">
                <div className="flex items-center gap-2 mb-2">
                  <Ship className="w-4 h-4 text-teal-500 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Logistics
                  </span>
                </div>
                <p className="text-gray-900 font-semibold text-sm sm:text-base leading-tight ">
                  {product.best_shipment_modes || "Flexible"}
                </p>
              </div>
            </div>

            {/* "Why Choose Us" MOVED HERE */}
            <div className="bg-[#1A1C23] rounded-3xl p-6 text-white shadow-xl shadow-gray-200 relative overflow-hidden isolate">
              {/* Decorative Background Elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/20 rounded-full -ml-10 -mb-10 blur-3xl"></div>

              <h3 className="text-lg font-bold mb-4 flex items-center relative z-10">
                <div className="bg-yellow-500/20 p-2 rounded-lg mr-3 backdrop-blur-sm">
                  <Award className="w-5 h-5 text-yellow-400" />
                </div>
                Why Choose Us?
              </h3>

              <div className="grid grid-cols-1 gap-y-3 relative z-10">
                {(Array.isArray(product.why_choose_us)
                  ? product.why_choose_us
                  : [product.why_choose_us]
                ).map((feature, index) => (
                  <div key={index} className="flex items-start group">
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center mr-3 shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300 border border-white/10 shadow-lg">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-gray-300 text-sm leading-relaxed pt-0.5 group-hover:text-white transition-colors">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications List */}
            {product.certifications && product.certifications.length > 0 && (
              <div className="pt-6 border-t border-gray-200">
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-3">
                  Certified By
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.certifications.map((cert, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center px-3.5 py-2 rounded-xl bg-white text-gray-700 font-medium text-xs border border-gray-200 shadow-sm hover:border-primary/30 hover:text-primary transition-colors cursor-default"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Desktop Action Buttons (Hidden on Mobile) */}
            <div className="hidden lg:grid grid-cols-2 gap-4 pt-4">
              <button
                onClick={handleCallUs}
                className="group border-2 border-gray-200 bg-white text-gray-700 px-6 py-4 rounded-2xl font-bold hover:border-gray-300 hover:bg-gray-50 transition-all flex items-center justify-center shadow-sm"
              >
                <Phone className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform text-gray-500 group-hover:text-gray-900" />
                Call Us
              </button>
              <button
                onClick={handleContactUs}
                className="group bg-primary text-white px-6 py-4 rounded-2xl font-bold hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 hover:shadow-primary/30 flex items-center justify-center hover:-translate-y-0.5"
              >
                <Mail className="w-5 h-5 mr-3 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                Request Quote
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- MOBILE STICKY CTA BAR (Visible only on small screens) --- */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-200 p-4 lg:hidden z-50 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <div className="grid grid-cols-[1fr_2fr] gap-3 max-w-md mx-auto">
          <button
            onClick={handleCallUs}
            className="flex flex-col items-center justify-center py-3 rounded-xl text-gray-600 bg-gray-50 hover:bg-gray-100 active:scale-95 transition-transform border border-gray-200"
          >
            <Phone className="w-5 h-5 mb-1 text-gray-900" />
            <span className="text-[10px] font-bold uppercase tracking-wide text-gray-500">
              Call
            </span>
          </button>
          <button
            onClick={handleContactUs}
            className="bg-primary text-white rounded-xl py-3 font-bold shadow-lg shadow-primary/20 flex items-center justify-center active:scale-95 transition-transform hover:bg-primary/90"
          >
            <Mail className="w-5 h-5 mr-2" />
            Get Quote
          </button>
        </div>
      </div>

      {/* --- FOOTER SECTIONS --- */}
      <div className="space-y-0">
        <ProductSection />
        <ImportExportSection />
        <Accordion count={3} className="bg-secondarylight" />
        <JoinUsSection />
      </div>
    </div>
  );
};

export default ProductDetails;
