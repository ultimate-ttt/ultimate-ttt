const path = require('path');

// FIXME: bug when starting up:
/*
File '/.../node_modules/redux-persist/es/integration/react.js'
is not under 'rootDir' '/.../src'.
'rootDir' is expected to contain all source files
 */
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