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
    },
  },
  plugins: [],
} satisfies Config;
