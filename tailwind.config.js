/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode : "class",
  theme: {
    extend: {
      colors : {
        primary : "#f42c37",
        secondary : "#f42c37",
        brandYellow : "#fdc62e",
        brandGreen : "#2dcc6f",
        brandBlue : "#1376f4",
        brandWhite : "#eeeeee",
      },
      container : {
        center : true,
        padding : {
          DEFAULT : "1rem",
          sm : "3rem",
        }
      },
      keyframes: {
        aurora: {
          "0%": { transform: "translate(0,0) scale(1)" },
          "25%": { transform: "translate(30px,-20px) scale(1.1)" },
          "50%": { transform: "translate(-20px,30px) scale(0.9)" },
          "75%": { transform: "translate(20px,20px) scale(1.05)" },
          "100%": { transform: "translate(-10px,-10px) scale(1)" },
        },
        float: {
          "0%": { transform: "translateY(-15px)" },
          "100%": { transform: "translateY(15px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 0%" },
          "100%": { backgroundPosition: "200% 0%" },
        },
        gradientShift: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" },
        },
        pulseGlow: {
          "0%": { boxShadow: "0 0 0 0 rgba(0,255,136,0.3)" },
          "100%": { boxShadow: "0 0 20px 20px rgba(0,255,136,0.3)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        aurora: "aurora 8s ease infinite",
        float: "float 3s ease-in-out infinite alternate",
        shimmer: "shimmer 3s linear infinite",
        gradientShift: "gradientShift 4s ease infinite alternate",
        pulseGlow: "pulseGlow 2s ease-in-out infinite alternate",
        fadeUp: "fadeUp 0.6s ease-out forwards",
        scaleIn: "scaleIn 0.5s ease-out forwards",
      },
    },
  },
  plugins: [],
}

