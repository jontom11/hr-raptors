import webpack from 'webpack';
import path from 'path';

const config = {
  entry: './client/src/app',
  output: {
    path: path.join(__dirname, 'public/dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/,
        include: path.join(__dirname, 'client/src'),
        exclude: ['node_modules'],
        use: [
          { loader: 'babel-loader',
            options: {
              presets: ['react', 'es2015']
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [{
          loader: 'style-loader' // creates style nodes from JS strings
        }, {
          loader: 'css-loader' // translates CSS into CommonJS
        }, {
          loader: 'sass-loader' // compiles Sass to CSS
        }]
      },
    ]
  },
  // loaders: [
  //   {
  //     test: /\.scss$/,
  //     loaders: ["style-loader", "css-loader", "sass-loader"]
  //   }
  // ],
};

export default config;
