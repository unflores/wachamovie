require('dotenv').config()
import logger from './src/config/logger'
import { configure } from './src/config/webserver'
const Koa = require('koa')

const app = configure(new Koa())

if (!module.parent) {
  app.listen(app.context.port)

  logger.info(
    {
      port: app.context.port,
      environment: process.env.NODE_ENV,
    },
    ' (╯°□°）╯︵ ┻━┻',
  )
}

export { app }
