module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    colors: {
      // Configure your color palette here'
      bgColor: "#f5f7fa",
      white: "#fff",
      upDown: "#5b5b91",
      mention: "#7a7cb4",
      paragraph: "#86868a",
      line: "#ececf1",
      red: "#c37d86",
    },
    extend: {
      gridRow: {
        "1/3": "1/3",
        "1/1":"1/1"
      },
      gridColumn:{
        "3/4":"3/4",
        "1/2":"1/2",
        "2/3":"2/3",
        "1/3":"1/3",
        "2/2":"2/2"
      },gridTemplateColumns:{
        "100px-1fr":"100px 1fr",
        "4rem-1fr-auto":"4rem 1fr auto"
      }
    },
  },
  plugins: [require("daisyui")],
};
