const env = process.env
const { defineConfig } = require('@vue/cli-service')
const TerserPlugin = require('terser-webpack-plugin')
const px2remvw = require('./plugins/px2remvw')

const isDev = env.NODE_ENV === 'development'

// 配置css-loader-plugins
const cssPlugins = []
// px自动转rem/vw单位
eval(env.AUTOPX2REM) &&
  cssPlugins.push(
    px2remvw({
      viewportWidth: false,
      remRoot: 100,
      viewportUnit: 'rem',
      minPixelValue: 1,
      unitPrecision: 5,
      ignoreProperty: [],
      exclude: /node_modules/i,
    }),
  )

module.exports = defineConfig({
  transpileDependencies: true,

  devServer: {
    port: 8080,
    host: '0.0.0.0',
    https: false,
    open: false,
    proxy: {
      [`${env.VUE_APP_BASEURL}`]: {
        target: env.PROXY_URL || '',
        changeOrigin: true,
      },
    },
  },

  publicPath: env.VUE_APP_PUBLICPATH || '/',

  lintOnSave: false,
  css: {
    sourceMap: isDev,
    loaderOptions: {
      postcss: {
        postcssOptions: {
          // 借助plugin形式全局注入px2rem插件
          plugins: cssPlugins,
        },
      },
    },
  },
  productionSourceMap: false,

  configureWebpack: () => {
    const config = {
      optimization: {
        minimizer: [
          new TerserPlugin({
            parallel: true,
            terserOptions: {
              ecma: undefined,
              warnings: false,
              output: null,
              parse: {},
              compress: {
                drop_console: true,
                drop_debugger: false,
                pure_funcs: ['console.log'],
              },
            },
          }),
        ],
      },
    }
    if (isDev) {
      config.devtool = 'source-map'
      // config.devtool = 'inline-source-map'
    }
    return config
  },
  pwa: {
    name: 'gameCenter',
    themeColor: '#4c89fe',
    msTileColor: '#4c89fe',
    manifestOptions: {
      start_url: '.',
      background_color: '#4c89fe',
    },
    workboxPluginMode: 'GenerateSW',
    workboxOptions: {},
  },
})
