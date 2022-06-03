module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    colors: {
      // Configure your color palette here'
      'bgColor' : '#f5f7fa',
      'white': '#fff',
      'upDown': '#5b5b91',
      'mention': '#7a7cb4',
      'paragraph': '#86868a',
      'line': '#ececf1'
    },
    extend: {},
  },
  plugins: [require("daisyui")],
};
