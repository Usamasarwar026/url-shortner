import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to right, #144EE3, #EB568E, #A353AA, #144EE3)',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        buttonColor: '#144EE3',
      },
      boxShadow: {
        'md': '0 8px 20px rgba(20, 78, 227, 0.4)',  
        'lg': '0 15px 40px rgba(20, 78, 227, 0.5)',  
      },
    },
  },
  plugins: [],
} satisfies Config;
