process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const environment = require('./environment')

// noinspection JSUnresolvedFunction
module.exports = environment.toWebpackConfig()
