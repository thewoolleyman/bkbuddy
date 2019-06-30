const PnpWebpackPlugin = require('pnp-webpack-plugin')

// noinspection JSUnresolvedFunction
module.exports = {
  test: /\.(ts|tsx)?(\.erb)?$/,
  use: [
    {
      loader: 'ts-loader',
      options: PnpWebpackPlugin.tsLoaderOptions()
    }
  ]
}
