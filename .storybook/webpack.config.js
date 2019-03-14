const path = require('path');

module.exports = ({config}) => {
    config.module.rules.push({
        test: /\.scss$/,
        loaders: ["style-loader", "css-loader", "sass-loader"],
        include: path.resolve(__dirname, '../src')
    });
    config.resolve.extensions.push('.scss');

    config.module.rules.push({
        test: /\.(ts|tsx)$/,
        include: path.resolve(__dirname, '../src'),
        loader: require.resolve('ts-loader')
    });
    config.resolve.extensions.push('.ts', '.tsx');

    return config;
};