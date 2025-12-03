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
  X,
  ChevronLeft,
  ZoomIn,
  Check,
  Sprout,
} from "lucide-react";
import { useApp } from "../../context/AppContext";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ProductSection from "../Home/ProductSection";
import ImportExportSection from "../Home/ImportExportSection";
import Accordion from "../UI/Accordian";
import JoinUsSection from "../Home/JoinUsSection";
import { contactDetails } from "../../utils/ContactDetails";

// --- INTERNAL COMPONENT: LIGHTBOX ---
interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: { base64: string }[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
}

const ImageLightbox: React.FC<LightboxProps> = ({
  isOpen,
  onClose,
  images,
  currentIndex,
  onIndexChange,
}) => {
  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") {
        onIndexChange(
          currentIndex === 0 ? images.length - 1 : currentIndex - 1
        );
      }
      if (e.key === "ArrowRight") {
        onIndexChange(
          currentIndex === images.length - 1 ? 0 : currentIndex + 1
        );
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, images.length, currentIndex, onIndexChange, onClose]);

  // Handle Swipe Gesture
  const onDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const threshold = 50; // Minimum distance to swipe
    if (info.offset.x > threshold) {
      // Swiped Right -> Go to Previous
      onIndexChange(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
    } else if (info.offset.x < -threshold) {
      // Swiped Left -> Go to Next
      onIndexChange(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md"
          onClick={onClose}
        >
          {/* Close Button - Top Right */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 md:top-6 md:right-6 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-[110] backdrop-blur-sm"
          >
            <X className="w-6 h-6 md:w-8 md:h-8" />
          </button>

          {/* Container */}
          <div
            className="relative w-full h-full flex items-center justify-center overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left Arrow - Hidden on small mobile if you prefer swipe only, but kept here for accessibility */}
            {images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onIndexChange(
                    currentIndex === 0 ? images.length - 1 : currentIndex - 1
                  );
                }}
                className="absolute left-2 md:left-8 p-3 text-white bg-black/40 hover:bg-black/60 rounded-full transition-all z-[110] backdrop-blur-sm border border-white/10 group"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 group-hover:scale-110 transition-transform" />
              </button>
            )}

            {/* Image Wrapper with Swipe Support */}
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 0, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={onDragEnd}
              className="relative flex items-center justify-center w-full h-full px-2 md:px-20"
              style={{ touchAction: "none" }}
            >
              <img
                src={images[currentIndex]?.base64 || "/Images/fallback.png"}
                alt={`View ${currentIndex + 1}`}
                className="max-w-full max-h-[80vh] md:max-h-[90vh] object-contain shadow-2xl rounded-sm select-none pointer-events-none"
              />
            </motion.div>

            {/* Right Arrow */}
            {images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onIndexChange(
                    currentIndex === images.length - 1 ? 0 : currentIndex + 1
                  );
                }}
                className="absolute right-2 md:right-8 p-3 text-white bg-black/40 hover:bg-black/60 rounded-full transition-all z-[110] backdrop-blur-sm border border-white/10 group"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6 md:w-8 md:h-8 group-hover:scale-110 transition-transform" />
              </button>
            )}

            {/* Counter Badge */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-black/60 backdrop-blur-md rounded-full text-white/90 text-xs md:text-sm font-medium border border-white/10 z-[110]">
              {currentIndex + 1} / {images.length}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- MAIN COMPONENT ---
const ProductDetails: React.FC = () => {
  const { products, loading } = useApp();
  const { productid } = useParams();
  const navigate = useNavigate();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [imageErrorIndexes, setImageErrorIndexes] = useState<number[]>([]);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productid]);

  // --- 1. Loading State ---

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] pt-24 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8 lg:gap-16">
          {/* --- Left Column Skeleton (Gallery) --- */}
          <div className="lg:col-span-7 space-y-6 animate-pulse">
            {/* Main Image Placeholder */}
            <div className="bg-gray-200 rounded-[2rem] aspect-[4/3] w-full shadow-sm"></div>

            {/* Thumbnails Row */}
            <div className="flex gap-4 overflow-hidden">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-200 rounded-2xl shrink-0 border border-gray-100"
                ></div>
              ))}
            </div>

            {/* Info Cards (Health/Applications) Placeholder */}
            <div className="grid md:grid-cols-2 gap-5 pt-4">
              <div className="h-48 bg-gray-200 rounded-3xl"></div>
              <div className="h-48 bg-gray-200 rounded-3xl"></div>
            </div>
          </div>

          {/* --- Right Column Skeleton (Details) --- */}
          <div className="lg:col-span-5 space-y-8 animate-pulse">
            {/* Header Section */}
            <div className="space-y-4">
              {/* Category Pill */}
              <div className="h-6 w-24 bg-gray-200 rounded-full"></div>

              {/* Title */}
              <div className="h-10 w-3/4 bg-gray-200 rounded-xl"></div>

              {/* Description Lines */}
              <div className="space-y-3 pt-2">
                <div className="h-4 bg-gray-200 rounded-full w-full"></div>
                <div className="h-4 bg-gray-200 rounded-full w-[90%]"></div>
                <div className="h-4 bg-gray-200 rounded-full w-[95%]"></div>
              </div>
            </div>

            {/* Specs Grid Skeleton */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`h-24 bg-gray-200 rounded-2xl ${
                    i === 1 || i === 4 ? "col-span-2" : ""
                  }`}
                ></div>
              ))}
            </div>

            {/* Why Choose Us Skeleton */}
            <div className="h-40 bg-gray-800/10 rounded-3xl"></div>

            {/* Buttons Skeleton */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="h-14 bg-gray-200 rounded-2xl"></div>
              <div className="h-14 bg-gray-300 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- 2. System Error State ---
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
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-gray-900 hover:bg-black text-white px-6 py-4 rounded-xl transition-all font-semibold flex items-center justify-center"
          >
            <Loader2 className="mr-2 w-5 h-5" /> Reload Page
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
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Product Not Found
          </h1>
          <button
            onClick={() => navigate("/products")}
            className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-primary rounded-2xl hover:bg-primary/90 transition-all shadow-lg"
          >
            <ArrowLeft className="w-5 h-5 mr-2" /> Browse Catalog
          </button>
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
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleImageError = (index: number) => {
    setImageErrorIndexes((prev) => [...prev, index]);
  };

  // Helper to parse origin safely (string or array)
  const getOrigins = () => {
    if (Array.isArray(product.origin)) return product.origin;
    if (typeof product.origin === "string") return product?.origin?.split(",");
    return ["Unknown"];
  };
  const originList = getOrigins();
  const hasApps = product.applications && product.applications.length > 0;
  const hasHealth =
    product.health_benefits &&
    (Array.isArray(product.health_benefits)
      ? product.health_benefits.length > 0
      : !!product.health_benefits);

  // product name and short description

  const [productname, ShortDescription] = product?.name
    ? product.name
        .split("(")
        .map((part, index) =>
          index === 1 ? part.replace(")", "").trim() : part.trim()
        )
    : ["", ""];

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans selection:bg-primary/20">
      {/* --- Breadcrumb Navigation --- */}
      <div className="bg-white/80 border-b sticky top-0 z-40 backdrop-blur-md transition-all">
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
            <button
              onClick={() =>
                navigate(
                  `/products/c/${product?.category.toLowerCase().trim()}`
                )
              }
              className="hover:text-primary transition-colors"
            >
              {product?.category || "category"}
            </button>
            <ChevronRight className="w-4 h-4 mx-2 text-gray-300 shrink-0" />
            <span className="text-gray-900 truncate max-w-[120px] sm:max-w-xs font-semibold">
              {productname || product.name}
            </span>
          </nav>
        </div>
      </div>

      {/* --- Hero Section --- */}
      <div className="relative bg-gray-900 border-b border-gray-200 overflow-hidden min-h-[20rem] flex items-center justify-center py-10 sm:py-0">
        <div className="absolute inset-0 z-0">
          <img
            src={
              product?.photos?.[selectedImageIndex]?.base64 ||
              "/path/to/placeholder.png"
            }
            alt={product?.name ?? "Product"}
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-gray-900/40" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-3 sm:mb-4 drop-shadow-lg px-2">
              Finest{" "}
              <span className="text-primary block sm:inline">
                {productname || "Our Product"}
              </span>
            </h1>

            {ShortDescription && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-base sm:text-lg text-white/90 font-medium mb-4 max-w-lg mx-auto drop-shadow-md"
              >
                {ShortDescription}
              </motion.p>
            )}
            <div className="w-12 h-1 bg-primary rounded-full mb-4 opacity-80 shadow-[0_0_10px_rgba(255,255,255,0.3)]"></div>
            <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto leading-relaxed font-light drop-shadow-md">
              Discover the premium quality of{" "}
              <span className="text-white font-semibold">
                {productname || "our product"}
              </span>
              , crafted to deliver exceptional taste and purity.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-10 pb-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* --- LEFT COLUMN: Gallery & Features --- */}
          <div className="lg:col-span-7 space-y-8">
            {/* Mobile Header */}
            <div className="space-y-4 block sm:hidden">
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
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-[1.1] hyphens-none">
                  {productname || product?.name || "Our Product"}
                </h1>

                {ShortDescription && (
                  <h3 className="text-lg sm:text-xl text-gray-700 mt-2 font-medium">
                    {ShortDescription}
                  </h3>
                )}
              </div>
            </div>

            {/* Main Gallery Component */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-[2rem] p-2 sm:p-8 shadow-xl shadow-gray-200/50 border border-white relative overflow-hidden group"
              >
                <div
                  onClick={() => setIsLightboxOpen(true)}
                  className="aspect-[4/3] flex items-center justify-center bg-gray-50/50 rounded-3xl overflow-hidden cursor-zoom-in relative"
                >
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
                    <div className="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                      <ZoomIn className="w-6 h-6 text-gray-800" />
                    </div>
                  </div>

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
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-in-out mix-blend-multiply"
                      onError={() => handleImageError(selectedImageIndex)}
                    />
                  </AnimatePresence>
                </div>

                <div className="absolute top-6 left-6 flex flex-col gap-2 z-10 pointer-events-none">
                  {product.availability && (
                    <motion.span
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      className="px-3 py-1.5 bg-emerald-500/90 backdrop-blur-md text-white text-[10px] sm:text-xs font-bold uppercase tracking-wide rounded-full shadow-lg flex items-center gap-1.5 w-fit"
                    >
                      <CheckCircle2 className="w-3 h-3" />
                      {product.availability}
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
                          : photo?.base64
                      }
                      alt={`Thumbnail ${i + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={() => handleImageError(i)}
                    />
                  </button>
                ))}
              </div>

              {/* Lightbox Render */}
              <ImageLightbox
                isOpen={isLightboxOpen}
                onClose={() => setIsLightboxOpen(false)}
                images={product.photos}
                currentIndex={selectedImageIndex}
                onIndexChange={setSelectedImageIndex}
              />
            </div>

            {/* Detailed Info Cards */}

            <div className="grid grid-cols-1 gap-5 h-full">
              {hasApps && (
                <div
                  className={`bg-white rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 relative overflow-hidden group h-full ${
                    !hasHealth ? "md:col-span-2" : ""
                  }`}
                >
                  {/* Watermark */}
                  <div className="absolute -bottom-6 -right-6 z-0 pointer-events-none">
                    <Package
                      strokeWidth={1}
                      className="w-48 h-48 text-blue-50 opacity-60 -rotate-12 group-hover:scale-110 group-hover:rotate-0 transition-transform duration-700 ease-in-out"
                    />
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-3 ">
                      <div className="bg-blue-50 p-2.5 rounded-xl text-blue-600 shadow-sm">
                        <Package className="w-5 h-5" />
                      </div>
                      Applications
                    </h3>
                    <div className="w-full h-[0.5px] bg-gradient-to-r from-transparent via-secondaryDark/50 to-transparent " />

                    <ul className="mt-5 space-y-4">
                      {product?.applications?.map((app, i) => (
                        <li key={i} className="flex items-start group/item">
                          <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-4 shrink-0 shadow-sm shadow-blue-200 group-hover/item:scale-125 transition-transform"></span>
                          <span className="text-gray-600 text-sm sm:text-base leading-relaxed group-hover/item:text-gray-900 transition-colors hyphens-auto">
                            {app}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {hasHealth && (
                <div
                  className={`bg-white rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 relative overflow-hidden group h-full ${
                    !hasApps ? "md:col-span-2" : ""
                  }`}
                >
                  {/* Watermark */}
                  <div className="absolute -bottom-6 -right-6 z-0 pointer-events-none">
                    <Leaf
                      strokeWidth={1}
                      className="w-48 h-48 text-green-50 opacity-60 -rotate-12 group-hover:scale-110 group-hover:rotate-0 transition-transform duration-700 ease-in-out"
                    />
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-3 ">
                      <div className="bg-green-50 p-2.5 rounded-xl text-green-600 shadow-sm">
                        <Leaf className="w-5 h-5" />
                      </div>
                      Health Benefits
                    </h3>
                    <div className="w-full h-[0.5px] bg-gradient-to-r from-transparent via-secondaryDark/50 to-transparent " />

                    <ul className="mt-5 space-y-4">
                      {(Array.isArray(product.health_benefits)
                        ? product.health_benefits
                        : [product.health_benefits]
                      ).map((benefit, i) => (
                        <li key={i} className="flex items-start group/item">
                          <div className="shrink-0 mt-0.5 mr-4 text-green-500 bg-green-50 rounded-full p-0.5 group-hover/item:bg-green-100 transition-colors">
                            <CheckCircle2 className="w-4 h-4" />
                          </div>
                          <span className="text-gray-600 text-sm sm:text-base leading-relaxed group-hover/item:text-gray-900 transition-colors hyphens-auto">
                            {benefit}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* --- RIGHT COLUMN: Info & Specs (Sticky on Desktop) --- */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
            {/* Product Header */}
            <div className="space-y-4 px-4 sm:px-0">
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

              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-[1.1] hyphens-none">
                  {productname || product?.name || "Our Product"}
                </h1>

                {ShortDescription && (
                  <h3 className="text-lg sm:text-xl text-gray-700 mt-2 font-medium">
                    {ShortDescription}
                  </h3>
                )}
              </div>

              <div className="prose prose-gray text-justify ">
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed whitespace-pre-line break-words hyphens-none">
                  {product.description}
                </p>
              </div>
            </div>

            {/* Specs Grid */}
            <div className=" relative bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md hover:border-gray-300">
              <div className="absolute -bottom-12 -right-12 z-0 pointer-events-none opacity-[0.04] transition-opacity duration-500">
                <Sprout
                  strokeWidth={0.8}
                  className="w-64 h-64  -rotate-12 text-green-500"
                />
              </div>

              <div className="relative z-10 flex items-center gap-2.5 px-6 py-4 bg-gray-50/60 border-b border-gray-100 backdrop-blur-sm">
                <div className="bg-white p-1.5 rounded-md shadow-sm border border-gray-100">
                  <Shield className="w-3.5 h-3.5 text-primary" />
                </div>
                <span className="text-xs font-bold text-gray-600 uppercase tracking-widest">
                  Product Specifications
                </span>
              </div>

              <div className="relative z-10 p-6 space-y-5">
                <div className="group/item">
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <MapPin className="w-4 h-4 text-primary group-hover/item:scale-110 transition-transform" />
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Origin
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {originList.map((origin: any, idx: any) => (
                      <span
                        key={idx}
                        className="inline-flex items-center px-2.5 py-1 rounded-md bg-primary/5 text-primary text-xs sm:text-sm font-semibold border border-primary/10 transition-colors hover:bg-primary/10"
                      >
                        {origin.trim()}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent " />

                <div className="group/item">
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <Calendar className="w-4 h-4 text-amber-500 group-hover/item:scale-110 transition-transform" />
                    <span className="text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-wider">
                      Shelf Life
                    </span>
                  </div>

                  <p className="text-gray-900 font-medium text-sm sm:text-base leading-relaxed pl-6.5">
                    {product.shelf_life || "N/A"}
                  </p>
                </div>
                <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent " />

                <div className="group/item">
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <Thermometer className="w-4 h-4 text-purple-500 group-hover/item:scale-110 transition-transform" />
                    <span className="text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-wider">
                      Storage
                    </span>
                  </div>
                  <p className="text-gray-900 font-medium text-sm sm:text-base  leading-relaxed pl-6.5">
                    {product.storage_conditions || "Standard"}
                  </p>
                </div>

                <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent " />

                <div className="group/item">
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <Ship className="w-4 h-4 text-teal-600 group-hover/item:scale-110 transition-transform" />
                    <span className="text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-wider">
                      Logistics & Shipment
                    </span>
                  </div>
                  <p className="text-gray-900 font-medium text-sm sm:text-base leading-relaxed max-w-prose pl-6.5">
                    {product.best_shipment_modes ||
                      "Flexible Shipment Available"}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-[#1A1C23] rounded-3xl p-6 text-white shadow-xl shadow-gray-200 relative overflow-hidden isolate mt-4">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/20 rounded-full -ml-10 -mb-10 blur-3xl"></div>

              <h3 className="text-lg font-bold mb-4 flex items-center relative z-10">
                <div className="bg-yellow-500/20 p-2 rounded-lg mr-3 backdrop-blur-sm">
                  <Award className="w-5 h-5 text-yellow-400" />
                </div>
                Why Choose Us?
              </h3>
              <div className="w-full h-[0.5px] bg-gradient-to-r from-transparent via-secondary to-transparent " />

              <div className="mt-5 grid grid-cols-1 gap-y-3 relative z-10">
                {(Array.isArray(product.why_choose_us)
                  ? product.why_choose_us
                  : [product.why_choose_us]
                ).map((feature, index) => (
                  <div key={index} className="flex items-start group">
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center mr-3 shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300 border border-white/10 shadow-lg">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-gray-300 text-sm leading-relaxed pt-0.5 group-hover:text-white transition-colors hyphens-none">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Action Buttons */}
            <div className="hidden lg:grid grid-cols-[1fr_1fr_auto] gap-3 pt-4">
              <button
                onClick={handleCallUs}
                className="group border-2 border-gray-200 bg-white text-gray-700 px-4 py-4 rounded-2xl font-bold hover:border-gray-300 hover:bg-gray-50 transition-all flex items-center justify-center shadow-sm"
              >
                <Phone className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform text-gray-500 group-hover:text-gray-900" />
                Call
              </button>

              <button
                onClick={handleContactUs}
                className="group bg-primary text-white px-4 py-4 rounded-2xl font-bold hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 hover:shadow-primary/30 flex items-center justify-center hover:-translate-y-0.5 whitespace-nowrap"
              >
                <Mail className="w-5 h-5 mr-2 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                Get Quote
              </button>

              <button
                onClick={handleShare}
                className="group bg-gray-100 text-gray-600 px-4 py-4 rounded-2xl font-bold hover:bg-gray-200 transition-all flex items-center justify-center"
                title="Share this product"
              >
                {copied ? (
                  <Check className="w-6 h-6 text-green-600" />
                ) : (
                  <Share2 className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- MOBILE STICKY CTA BAR --- */}
      <div className="fixed bottom-0 left-0 z-60 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-200 px-3 py-5 lg:hidden pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <div className="grid grid-cols-[auto_1fr_1.5fr] gap-2 max-w-md mx-auto">
          <button
            onClick={handleShare}
            className="flex flex-col items-center justify-center px-4 rounded-xl text-gray-600 bg-gray-50 hover:bg-gray-100 active:scale-95 transition-transform border border-gray-200"
          >
            {copied ? (
              <Check className="w-5 h-5 text-green-600" />
            ) : (
              <Share2 className="w-5 h-5 text-gray-900" />
            )}
          </button>

          <button
            onClick={handleCallUs}
            className="flex items-center justify-center py-3 rounded-xl text-gray-700 bg-gray-50 hover:bg-gray-100 active:scale-95 transition-transform border border-gray-200 font-bold text-sm"
          >
            <Phone className="w-4 h-4 mr-2" />
            Call
          </button>

          <button
            onClick={handleContactUs}
            className="bg-primary text-white rounded-xl py-3 font-bold shadow-lg shadow-primary/20 flex items-center justify-center active:scale-95 transition-transform hover:bg-primary/90 text-sm"
          >
            <Mail className="w-4 h-4 mr-2" />
            Get Quote
          </button>
        </div>
      </div>

      {/* --- FOOTER SECTIONS --- */}
      <div className="space-y-0">
        <ProductSection />
        <ImportExportSection />
        <div className="relative">
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50 pointer-events-none"></div>
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent shadow-[0_1px_12px_0_rgba(0,0,0,0.1)]" />
          <Accordion count={3} className="bg-secondarylight" />
        </div>
        <JoinUsSection />
      </div>
    </div>
  );
};

export default ProductDetails;
