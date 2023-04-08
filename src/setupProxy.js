//需要使用cjs(原始js)语法
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api1", {
      //遇见/api1前缀的请求就会触发该代理配置
      target: "http://localhost:5000", //请求转发给谁
      changeOrigin: true, //控制服务器收到的请求头中Host字段的值。如果是false，服务器拿到的host是3000端口，如果是true，服务器拿到的host是5000端口
      pathRewrite: { "^/api1": "" }, //重写请求路径，不写会发生严重错误，意思是把请求送给服务器时把路径中的/api1去掉
    })
  );
};
