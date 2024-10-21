const path = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  mode: 'development',  // Switch to 'production' for builds
  module: {
    rules: [
      {
        test: /\.jsx?$/,  // Match both .js and .jsx files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['react-refresh/babel']  // Enable React Fast Refresh
          }
        }
      },
      {
        test: /\.css$/,  // Match CSS files for Tailwind and other styles
        use: ['style-loader', 'css-loader', 'postcss-loader']
      }
    ]
  },
  plugins: [
    new ReactRefreshWebpackPlugin()  // Activate Hot Module Replacement for React
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    static: path.resolve(__dirname, 'dist'),  // Updated from contentBase
    port: 3000,
    hot: true  // Enable HMR globally
  }
};
