const { environment } = require('@rails/webpacker')

const customConfig = require('./custom')
environment.config.merge(customConfig)

const typescript =  require('./loaders/typescript')

environment.loaders.prepend('typescript', typescript)
module.exports = environment
