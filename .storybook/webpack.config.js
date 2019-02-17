const path = require('path')

module.exports = (baseConfig, env, defaultConfig) => {
    defaultConfig.module.rules.push({
        test: /\.scss$/,
        loaders: ["style-loader", "css-loader", "sass-loader"],
        include: path.resolve(__dirname, '../src')
    });
    defaultConfig.resolve.extensions.push('.scss');

    defaultConfig.module.rules.push({
        test: /\.(ts|tsx)$/,
        include: path.resolve(__dirname, '../src'),
        loader: require.resolve('ts-loader')
    });
    defaultConfig.resolve.extensions.push('.ts', '.tsx');

    return defaultConfig;
};