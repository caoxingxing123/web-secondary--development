module.exports = {
  "/api": {
    target: "http://10.15.111.9:12292",
    changeOrigin: true,
    pathRewrite: { "^/api": "" },
  },
};
