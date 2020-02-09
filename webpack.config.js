const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: './src/index.ts',
    output: {
        path: path.join(__dirname, "./dist"),
        filename:"main.js",
    },
    devServer:{
        port:9999,
        contentBase:path.join(__dirname),
    },
    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        modules: ["src", "node_modules"],
        extensions: [".ts", ".tsx",".js"]
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader"
                    }
                ]
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ]
    },        
    // plugins:[new webpack.HotModuleReplacementPlugin]

}