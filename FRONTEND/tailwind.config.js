/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dustyTaupe: "#351212",
        secondary: "#edced3",
        secondarylight: "#faf7fc",
        primary: "#b50421",
        gradientsecondary: "#111827",
        accent: "#D64550",
        secondaryDark: "#111827",
      },
      animation: {
        shimmer: "shimmer 2s infinite",
        float: "float 3s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite alternate",
        "spin-slow": "spin 3s linear infinite",
        "bounce-slow": "bounce 2s infinite",
        "pulse-slow": "pulse 3s infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 5px rgba(95, 26, 53, 0.5)" },
          "50%": {
            boxShadow:
              "0 0 20px rgba(95, 26, 53, 0.8), 0 0 30px rgba(204, 187, 174, 0.6)",
          },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "bounce-slow": {
          "0%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
          "100%": { transform: "translateY(0)" },
        },
        "pulse-slow": {
          "0%": { opacity: "1" },
          "50%": { opacity: "0.5" },
          "100%": { opacity: "1" },
        },
      },
      gradients: {
        primaryGradient: "linear-gradient(135deg, #5F1A35, #CCBBAE)",
        lightFadeGradient: "linear-gradient(135deg, #CCBBAE, #5F1A35)",
        radialHighlight: "radial-gradient(circle, #CCBBAE 0%, #5F1A35 100%)",
      },
      fontFamily: {
        playfair: ["Playfair Display", "serif"],
        poppins: ["Poppins", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        openSans: ["Open Sans", "sans-serif"],
      },
      boxShadow: {
        "button-primary": "0 4px 12px rgba(95, 26, 53, 0.4)",
        "button-hover": "0 8px 25px rgba(95, 26, 53, 0.5)",
        card: "0 2px 8px rgba(0, 0, 0, 0.05)",
        "card-hover": "0 10px 40px rgba(95, 26, 53, 0.15)",
        glow: "0 0 20px rgba(95, 26, 53, 0.5)",
        "glow-lg": "0 0 40px rgba(95, 26, 53, 0.6)",
      },
      backdropBlur: {
        xs: "2px",
      },
      spacing: {
        "hero-padding": "40px",
        18: "4.5rem",
        88: "22rem",
      },
      borderRadius: {
        button: "8px",
        "4xl": "2rem",
      },
      screens: {
        xs: "390px",
      },
      spacing: {
        card: "1.25rem",
        "card-sm": "1rem",
        "card-lg": "1.5rem",
      },
      borderRadius: {
        card: "0.875rem",
      },
      zIndex: {
        60: "60",
        70: "70",
        80: "80",
        90: "90",
        100: "100",
      },
    },
  },
  plugins: [],
};
