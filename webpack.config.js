const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const webpack = require('webpack')
const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev


const optimization = () => {
   const config = {
      splitChunks: {
         chunks: 'all'
      }
   }
   if (isProd) {
      config.minimizer = [
         new OptimizeCssAssetPlugin(),
         new TerserWebpackPlugin()
      ]
   }
   return config
}

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`

const cssloaders = extra => {
   const loaders = [{
      loader: MiniCssExtractPlugin.loader,
      options: {
         publicPath: (resourcePath, context) => {
            return path.relative(path.dirname(resourcePath), context) + '/';
         },
      }
   }, 'css-loader']
   if (extra) {
      loaders.push(extra)
   }

   return loaders
}


const bableOptions = preset => {
   const opts = {
      presets: [
         '@babel/preset-env'
      ],
      plugins: [
         '@babel/plugin-proposal-class-properties'
      ]
   }

   if (preset) {
      opts.presets.push(preset)
   }

   return opts

}

module.exports = {
   context: path.resolve(__dirname, "src"),
   mode: 'development',
   entry: {
      main: ['./js/index.js'],
   },
   output: {
      filename: `./js/${filename('js')}`,
      path: path.resolve(__dirname, 'dist'),
      publicPath: ''
   },
   resolve: {
      extensions: ['.js', '.json', '.png', 'csv'],
      alias: {
         '@models': path.resolve(__dirname, 'src/models'),
         '@': path.resolve(__dirname, 'src'),
      }
   },
   optimization: optimization(),
   devServer: {
      port: 4200,
      open: true,
      liveReload: true
   },
   // devtool: isDev ? 'source-map' : '',
   plugins: [
      new webpack.ProvidePlugin({
         $: 'jquery',
         jQuery: 'jquery',
      }),
      new HTMLWebpackPlugin(
         {
            template: path.resolve(__dirname, 'src/index.html'),
            filename: 'index.html',
            minify: {
               collapseWhitespace: isProd
            }
         }
      ),
      new CleanWebpackPlugin(),

      new CopyWebpackPlugin({
         patterns: [
            {
               from: path.resolve(__dirname, 'src/assets'),
               to: path.resolve(__dirname, 'dist/assets')
            }
         ]
      }),
      new MiniCssExtractPlugin({
         filename: `./css/${filename('css')}`
      }),

   ],
   module: {
      rules: [
         {
            test: /\.css$/,
            use: cssloaders()
         },
         {
            test: /\.less$/,
            use: cssloaders('less-loader')
         },
         {
            test: /\.s[ac]ss$/,
            use: cssloaders('sass-loader')
         },
         {
            test: /\.(png|jpg|svg|gif)$/,
            use: [{
               loader: 'file-loader',
               options: {
                  name: `./assets/img/${filename('[ext]')}`
               }
            }]

         },
         {
            test: /\.(ttf|woff|woff2|eot)$/,
            use: [{
               loader: 'file-loader',
               options: {
                  name: `./assets/fonts/${filename('[ext]')}`
               }
            }]
         },
         {
            test: /\.xml$/,
            use: ['xml-loader']

         },
         {
            test: /\.csv$/,
            use: ['csv-loader']
         },
         {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
               loader: 'babel-loader',
               options: bableOptions(),
            }
         },
         {
            test: /\.ts$/,
            exclude: /node_modules/,
            use: {
               loader: 'babel-loader',
               options: bableOptions("@babel/preset-typescript"),
            }
         },
         {
            test: /\.jsx$/,
            exclude: /node_modules/,
            use: {
               loader: 'babel-loader',
               options: bableOptions("@babel/preset-react"),
            }
         },
      ]
   }
}