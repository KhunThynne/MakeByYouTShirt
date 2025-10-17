const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  outputDir: 'WebApp',
  publicPath: process.env.NODE_ENV === 'production'
    ? '/WebApp/'
    : '/'
})
