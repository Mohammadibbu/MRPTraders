/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dustyTaupe: "#CCBBAE",
        secondary: "#e8e0da",
        secondarylight: "#F7F4F1",
        primary: "#5F1A35",
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
        card: "0 2px 8px rgba(0, 0, 0, 0.05)",
      },
      spacing: {
        "hero-padding": "40px",
      },
      borderRadius: {
        button: "8px",
      },
    },
  },
  plugins: [],
};
