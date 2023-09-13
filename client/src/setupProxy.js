const { createPoxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/api',
    createPoxyMiddleware({
      target: 'http://localhost:5001',
      changeOrigin: true,
    })
  )
}