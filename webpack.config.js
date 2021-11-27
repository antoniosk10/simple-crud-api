const path = require("path");
const dotenv = require("dotenv").config({
    path: path.join(__dirname, ".env"),
});
const webpack = require("webpack");

module.exports = {
    mode: "production",
    entry: "./server.js",
    output: {
        filename: "build.js",
        path: path.resolve(__dirname, "dist"),
    },
    target: "node",
    plugins: [
        new webpack.DefinePlugin({
            "process.env": dotenv.parsed,
        }),
    ],
};
