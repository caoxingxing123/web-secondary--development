module.exports = {
   "/api": {
      target: "http://172.22.175.1:18080/",
      changeOrigin: true,
      pathRewrite: { "^/api": "" },
   },
};
