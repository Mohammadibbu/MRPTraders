import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface GradientButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const GradientButton: React.FC<GradientButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  icon: Icon,
  iconPosition = "right",
  disabled = false,
  loading = false,
  className = "",
  type = "button",
}) => {
  const baseClasses =
    "relative overflow-hidden font-semibold rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const variantClasses = {
    primary: `
      bg-gradient-to-r from-primary to-[#6A0D4F] text-white 
      hover:from-primary/90 hover:to-[#6A0D4F]/90 
      focus:ring-primary/50 
      shadow-xl hover:shadow-2xl
    `,
    secondary: `
      bg-gradient-to-r from-[#6A0D4F] to-primary text-secondary
      hover:from-[#6A0D4F]/90 hover:to-primary/90
      focus:ring-[#6A0D4F]/50
      shadow-lg hover:shadow-xl
    `,
    outline: `
      border-2 border-primary text-primary bg-transparent
       hover:text-primary
      focus:ring-primary/50
    `,
  };

  const disabledClasses = "opacity-50 cursor-not-allowed";

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${baseClasses}
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${disabled || loading ? disabledClasses : ""}
        ${className}
      `}
      whileHover={
        !disabled && !loading
          ? {
              scale: 1.02,
              boxShadow: "0 10px 25px rgba(95, 26, 53, 0.3)",
            }
          : {}
      }
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
      transition={{ duration: 0.2 }}
      aria-disabled={disabled || loading ? "true" : "false"}
    >
      {/* Glow effect overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />

      {loading && (
        <>
          <motion.div
            className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            role="status"
            aria-label="Loading..."
          />
          <span>{children}</span>
        </>
      )}

      {/* Icon and label */}
      {!loading && Icon && iconPosition === "left" && (
        <Icon className="w-5 h-5" aria-hidden="true" />
      )}

      {!loading && <span>{children}</span>}

      {!loading && Icon && iconPosition === "right" && (
        <Icon className="w-5 h-5" aria-hidden="true" />
      )}
    </motion.button>
  );
};

export default GradientButton;
