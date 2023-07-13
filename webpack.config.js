const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const StylelintPlugin = require("stylelint-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: "development",
    entry: ["./styles/scss/styles.scss", "./js/script.js"],
    output: {
        filename: "js/script.js",
        path: path.resolve(__dirname, "dist"),
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            url: false,
                        },
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: ["autoprefixer"],
                            },
                        },
                    },
                    "sass-loader",
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/style.css",
        }),
        new StylelintPlugin({
            configFile: ".stylelintrc.json",
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "./assets/"),
                    to: path.resolve(__dirname, "./dist/assets"),
                },
                {
                    from: path.resolve(__dirname, "./index.html"),
                    to: path.resolve(__dirname, "./dist/"),
                },
            ],
        }),
    ],
};
