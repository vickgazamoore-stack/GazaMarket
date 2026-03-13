/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1d4ed8',
          100: '#dbeafe',
          200: '#bfdbfe',
          700: '#1e40af'
        },
        accent: '#f59e0b',
        neutral: {
          900: '#111827',
          700: '#374151',
          500: '#6b7280'
        }
      }
    },
  },
  plugins: [],
}
