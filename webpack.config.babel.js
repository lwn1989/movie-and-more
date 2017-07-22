import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

const defaultEnv = {
  dev: true,
  production: false
}

const extractSass = new ExtractTextPlugin({
  filename: '[name].css',
  disable: process.env.NODE_ENV !== 'production'
})

export default (env = defaultEnv) => ({
  entry: [
    ...env.dev ? [
      'react-hot-loader/patch'
    ] : [],
    path.join(__dirname, 'src/js/index.js')
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.min.js',
    publicPath: '/movieApp/'
  },

  plugins: [
    ...env.dev ? [
      // Webpack Development Plugins
      new webpack.HotModuleReplacementPlugin()
    ] : [],
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, 'src/index.html')
    }),
    extractSass
    // new webpack.optimize.ModuleConcatenationPlugin()
  ],

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include: path.join(__dirname, 'src/js'),
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              presets: [
                ['es2015', { modules: false }],
                'react', 'stage-0'
              ],
              plugins: ['react-hot-loader/babel', 'transform-decorators-legacy', 'transform-class-properties']
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'img/'
            }
          }, {
            loader: 'image-webpack-loader'
          }
        ]
      },
      {
        test: /\.scss$/,
        include: path.join(__dirname, 'src/styles'),
        use: extractSass.extract({
          use: [{
            loader: 'css-loader'
          }, {
            loader: 'sass-loader'
          }],
            // use style-loader in development
          fallback: 'style-loader'
        })
      }]
  },

  devServer: {
    hot: env.dev,
    historyApiFallback: true,
    historyApiFallback: {
      index: '/movieApp/'
    }
  }

})
