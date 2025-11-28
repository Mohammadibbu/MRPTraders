import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Phone, ExternalLink } from "lucide-react";
import { contactDetails } from "../../utils/ContactDetails";

const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const whatsappNumber = contactDetails?.phoneNumber || "1234567890";
  const defaultMessage =
    "Hi! I'm interested in your products. Can you help me?";

  // --- Handle Click Outside ---
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close only if clicking outside the component
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // --- Handlers ---
  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      defaultMessage
    )}`;
    window.open(url, "_blank");
    setIsOpen(false);
  };

  const handleCallClick = () => {
    window.open(`tel:${whatsappNumber}`, "_self");
    setIsOpen(false);
  };

  return (
    <div
      ref={containerRef}
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end"
    >
      {/* Expanded Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mb-4 mr-0"
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.9 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div className="bg-white rounded-2xl shadow-2xl p-5 min-w-[280px] border border-gray-100 overflow-hidden relative">
              {/* Decorative background circle */}
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-green-50 rounded-full opacity-50 pointer-events-none" />

              <div className="text-center mb-5 relative z-10">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <h3 className="font-bold text-gray-800 text-lg">
                    Need Help?
                  </h3>
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  Our team is here to assist you.
                </p>
              </div>

              <div className="space-y-3 relative z-10">
                <motion.button
                  onClick={handleWhatsAppClick}
                  className="w-full flex items-center justify-between p-3.5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-3">
                    <MessageCircle className="w-5 h-5" />
                    <span className="font-medium">WhatsApp Chat</span>
                  </div>
                  <ExternalLink className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                </motion.button>

                <motion.button
                  onClick={handleCallClick}
                  className="w-full flex items-center justify-between p-3.5 bg-gradient-to-r from-primary to-secondaryDark text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5" />
                    <span className="font-medium">Call Now</span>
                  </div>
                </motion.button>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 text-center">
                <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">
                  Replies typically within minutes
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-xl flex items-center justify-center relative z-50 transition-colors duration-300 ${
          isOpen
            ? "bg-gray-800"
            : "bg-gradient-to-r from-green-500 to-green-600"
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Contact Support"
        // --- RESTORED GLOW ANIMATION START ---
        animate={
          isOpen
            ? {}
            : {
                boxShadow: [
                  "0 0 0 0 rgba(34, 197, 94, 0.7)",
                  "0 0 0 10px rgba(34, 197, 94, 0)",
                  "0 0 0 20px rgba(34, 197, 94, 0)",
                ],
              }
        }
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 1,
        }}
        // --- RESTORED GLOW ANIMATION END ---
      >
        {/* Notification Dot (Only visible when closed) */}
        {!isOpen && (
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 border-2 border-white rounded-full z-10"></span>
        )}

        <div className="text-white relative z-10">
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="whatsapp"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <MessageCircle className="w-7 h-7" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.button>
    </div>
  );
};

export default FloatingWhatsApp;
