const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = (env, { mode }) => {
    const production = mode === "production";

    return {
        entry: "./src/index.js",
        output: {
            filename: production ? "[name].[contenthash].js" : "index.js",
            path: path.join(__dirname, "build"),
            assetModuleFilename: "assets/[name][ext]"
        },
        optimization:{
            minimizer:[
                new CssMinimizerPlugin()
            ]
        },
        devServer: {
            port: 3000,
            static:{
                directory: path.join(__dirname, "build")
            }
        },
        plugins: [
            new CssMinimizerPlugin(),
            new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" }),
            new HtmlWebpackPlugin({ template: "./src/index.html" }),
            new CopyPlugin({
                patterns: [
                  { from: "public", to: "." },
                  { from: "./personal_proyects.json", to: "." }
                ]
            })
        ],
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options:{
                            presets: ["@babel/preset-env"]
                        }
                    }
                },
                {
                    test:/\.css$/i,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: "css-loader", 
                            options: {
                                importLoaders: 1
                            }
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                postcssOptions: {
                                    plugins:[
                                        require("autoprefixer")({
                                            overrideBrowserslist: ["last 3 versions"]
                                        })
                                    ]
                                }
                            }
                        },
                    ]
                }
            ]
        }
    }
}; 