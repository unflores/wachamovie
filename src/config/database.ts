import * as bluebird from 'bluebird'
import mongoose = require('mongoose')
import logger from './logger'
const env = process.env.NODE_ENV

interface IConfig {
  uri?: string
}

const config: IConfig = {}

switch (env) {
  case 'development':
    config.uri = process.env.DEV_DB_URI
    mongoose.set('debug', true)
    break
  case 'production':
    config.uri = process.env.PROD_DB_URI
    break
  default:
    logger.fatal('Missing env!')
    process.exit()
}

mongoose.Promise = bluebird

mongoose.connection.on('connected', () => {
  logger.info(`Mongoose default connection open to ${config.uri}`)
})

// If the connection throws an error
mongoose.connection.on('error', (err) => {
  logger.error(`Mongoose default connection error: ${err}`)
})

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
  logger.info(`Mongoose default connection disconnected`)
})

export default (cb?: () => void) => {
  mongoose.connect(
    config.uri,
    cb,
  )
  return mongoose
}
