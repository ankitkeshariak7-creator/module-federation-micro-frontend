module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    // Optionally scan shared UI too if it uses Tailwind
    "../shared-ui/src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};