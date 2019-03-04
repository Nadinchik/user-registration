const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PurifyCssPlugin = require("purifycss-webpack");
const glob = require("glob-all");
const devEnv = process.env.NODE_ENV !== "production";

module.exports = {
  mode: "production",
  entry: ["babel-polyfill", "./src/js/index.jsx", "./src/css/styles.scss"],
  output: {
    path: `${__dirname}/dist/js`,
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["react", "env"],
              plugins: [
                "transform-object-rest-spread",
                "transform-class-properties"
              ]
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["env"],
              plugins: [
                "transform-object-rest-spread",
                "transform-class-properties"
              ]
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          //devEnv ? 'style-loader' :
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              url: false
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          //devEnv ? 'style-loader' :
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              url: false
            }
          },
          "sass-loader"
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          "file-loader",
          {
            loader: "image-webpack-loader",
            options: {
              bypassOnDebug: true, // webpack@1.x
              disable: true // webpack@2.x and newer
            }
          }
        ]
      }
    ]
  },
  resolve: { extensions: [".js", ".jsx"] },

  devtool: "source-map",

  plugins: [
    new MiniCssExtractPlugin({
      filename: "../css/styles.css"
    })
    //,
    // new PurifyCssPlugin({
    //   paths: glob.sync([
    //     require("path").join(__dirname, "./dist/index.html"),
    //     require("path").join(__dirname, "./src/js/*.js"),
    //     require("path").join(__dirname, "./src/js/*.jsx")
    //   ])
    // })
  ]
};