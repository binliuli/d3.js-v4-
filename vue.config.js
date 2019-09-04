const path = require('path')
const webpack = require('webpack')
function resolve(dir) {
  return path.join(__dirname, dir)
}
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
  devServer: {
    port: 3200
  },
  configureWebpack: {
    resolve: {
      alias: {
        'assets': path.resolve(__dirname, './src/assets'),
        'components': path.resolve(__dirname, './src/components'),
        'views': path.resolve(__dirname, './src/views'),
        'vue$': 'vue/dist/vue.esm.js',
        '@': resolve('src'),
      }
    },
    // console.log 自动去掉
    // optimization: {
    //   minimizer: [
    //     new UglifyJsPlugin({
    //       uglifyOptions: {
    //         compress: {
    //           warnings: false,
    //           drop_console: true,//console
    //           drop_debugger: false,
    //           pure_funcs: ['console.log']//移除console
    //         }
    //       }
    //     })
    //   ]
    // },
    // plugins: [
    //   new webpack.NormalModuleReplacementPlugin(/element-ui[\/\\]lib[\/\\]locale[\/\\]lang[\/\\]zh-CN/, 'element-ui/lib/locale/lang/en')
    // ]
  },
  // outputDir: './../nodeserver/public/assets'
}
