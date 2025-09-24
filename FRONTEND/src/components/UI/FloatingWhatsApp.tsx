import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Phone } from "lucide-react";

const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const whatsappNumber = "+919356380766";
  const defaultMessage =
    "Hi! I'm interested in your products. Can you help me?";

  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      defaultMessage
    )}`;
    window.open(url, "_blank");
  };

  const handleCallClick = () => {
    window.open(`tel:${whatsappNumber}`, "_self");
  };

  return (
    <>
      {/* Main floating button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 260, damping: 20 }}
      >
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full shadow-lg flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
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
        >
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
                <MessageCircle className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.div>

      {/* Expanded menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-40"
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="bg-white rounded-2xl shadow-2xl p-4 min-w-[280px] border border-gray-100">
              <div className="text-center mb-4">
                <h3 className="font-semibold text-gray-800 mb-1">Need Help?</h3>
                <p className="text-sm text-gray-600">
                  Choose how you'd like to contact us
                </p>
              </div>

              <div className="space-y-3">
                <motion.button
                  onClick={handleWhatsAppClick}
                  className="w-full flex items-center space-x-3 p-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <MessageCircle className="w-5 h-5" />
                  <span className="font-medium">WhatsApp Chat</span>
                </motion.button>

                <motion.button
                  onClick={handleCallClick}
                  className="w-full flex items-center space-x-3 p-3 bg-gradient-to-r from-primary to-primary text-white rounded-xl hover:from-primary/90 hover:to-dustyTaupe/90 transition-all duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Phone className="w-5 h-5" />
                  <span className="font-medium">Call Now</span>
                </motion.button>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100">
                <p className="text-xs text-gray-500 text-center">
                  Available 24/7 for your inquiries
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingWhatsApp;
