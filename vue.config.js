const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,

  // Add the devServer configuration to proxy the API calls
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8084',  // The base URL of the Weatherbit API
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''  // Remove /api from the request path before sending it to the target
        }
      }
    }
  }
})

