module.exports = {
  publicPath:'/',
  outputDir:'dist',
  productionSourceMap:false,
  css: {
    loaderOptions: {
      sass: {
        data: `$--color-primary:${process.env.VUE_APP_PRIMARY_COLOR};@import "@/styles/variables.scss";`
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