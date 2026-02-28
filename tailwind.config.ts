import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // Design System Primary Colors
                primary: {
                    DEFAULT: "#3B82F6",
                    50: "#EBF2FE",
                    100: "#D7E6FD",
                    200: "#AFCDFB",
                    300: "#87B4F9",
                    400: "#5F9BF7",
                    500: "#3B82F6",
                    600: "#0B61EE",
                    700: "#084BB8",
                    800: "#063583",
                    900: "#041F4D",
                    950: "#021432",
                },
                // Design System Dark Colors
                dark: {
                    DEFAULT: "#0F172A",
                    50: "#E2E8F0",
                    100: "#CBD5E1",
                    200: "#94A3B8",
                    300: "#64748B",
                    400: "#475569",
                    500: "#334155",
                    600: "#1E293B",
                    700: "#0F172A",
                    800: "#0B1120",
                    900: "#070B16",
                    950: "#03050A",
                },
            },
            fontFamily: {
                sans: ["var(--font-inter)", "system-ui", "sans-serif"],
            },
        },
    },
    plugins: [],
};

export default config;
