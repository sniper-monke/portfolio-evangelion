/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Noto Serif Display'", "'Playfair Display'", "serif"],
        mono: ["'JetBrains Mono'", "'Space Mono'", "monospace"],
        stamp: ["'Anton'", "'Oswald'", "sans-serif"],
        jp: ["'Noto Sans JP'", "'Shippori Mincho'", "sans-serif"],
      },
      colors: {
        nerv: {
          black: "#050505",
          surface: "#0a0a0a",
          orange: "#FF6B00",
          green: "#50FF50",
          red: "#FF3030",
          yellow: "#FFD700",
          cyan: "#20F0FF",
          text: "#D8D8D0",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
        popover: { DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      borderRadius: {
        lg: "0px",
        md: "0px",
        sm: "0px",
      },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        flicker: {
          "0%, 19%, 22%, 62%, 64%, 100%": { opacity: "1" },
          "20%, 21%, 63%": { opacity: "0.85" },
        },
        blink: { "0%, 50%": { opacity: "1" }, "51%, 100%": { opacity: "0" } },
        glitch: {
          "0%, 100%": { transform: "translate(0)", filter: "hue-rotate(0deg)" },
          "20%": { transform: "translate(-2px, 1px)", filter: "hue-rotate(10deg)" },
          "40%": { transform: "translate(2px, -1px)" },
          "60%": { transform: "translate(-1px, -2px)" },
          "80%": { transform: "translate(1px, 2px)" },
        },
        marquee: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.8)", opacity: "0.6" },
          "100%": { transform: "scale(2.2)", opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        scan: "scan 6s linear infinite",
        flicker: "flicker 4s infinite",
        blink: "blink 1s steps(1) infinite",
        glitch: "glitch 0.6s infinite",
        marquee: "marquee 30s linear infinite",
        "pulse-ring": "pulse-ring 1.8s cubic-bezier(0.215,0.61,0.355,1) infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
