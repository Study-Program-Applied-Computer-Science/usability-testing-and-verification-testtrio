module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }], // ✅ Transpile modern JS
    "@babel/preset-react" // ✅ Transpile JSX
  ],
  plugins: [
    "@babel/plugin-transform-runtime" // ✅ Fixes async/await and ES modules issues
  ]
};
