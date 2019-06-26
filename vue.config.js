module.exports = {
  baseUrl:'/',
  outputDir:'dist',
  productionSourceMap:false,
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/styles/variables.scss";`
      }
    }
  },
  // 配置代理
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost',
        ws: true,
        changeOrigin: true,
      },
      '/uploads': {
        target: 'http://localhost',
        ws: true,
        changeOrigin: true,
      }
    }
  }
}