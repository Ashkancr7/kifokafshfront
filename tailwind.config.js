/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",        // <--- دیگه src نداریم
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",      // محض احتیاط
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // <--- کامپوننت‌ها رو اینجا می‌سازیم
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",        // <--- پوشه lib
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1a1a1a',
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#f5f5f5',
          foreground: '#1a1a1a',
        },
        accent: {
          DEFAULT: '#c0a062',
          hover: '#b08d55',
        },
        muted: '#737373',
      },
      container: {
        center: true,
        padding: '1rem',
      },
    },
  },
  plugins: [],
}