import Router = require('koa-router')
import send = require('koa-send')
import serve = require('koa-static')
import mount = require('koa-mount')
import path = require('path')
import connectDatabase from '../config/database'
import apiRouter from '../modules/apiRouter'

const buildRoutes = (app) => {
  const router = new Router()

  app.use(mount('/files', serve(path.resolve(process.env.MOVIE_DIR))))
  app.use(mount('/assets', serve(path.resolve('front/assets'))))
  router.get('/', async (ctx) => await send(ctx, 'front/assets/index.html'))
  router.use(apiRouter.routes())
  app.use(router.routes())
  return app
}

/**
 * Configure the server app with default configuration
 *
 * @export
 * @param {Object} app application
 * @returns {Object} Configured web application
 */
export function configure(app) {
  app = buildRoutes(app)

  app.on('error', (error) => {
    if (error.code === 'EPIPE' || error.code === 'ECONNRESET') {
      ;// Gobbled, for displaying streams
    } else {
      console.error('App error', { error })
    }
  })

  connectDatabase()

  const port = process.env.PORT || '9090'
  app.context.port = port
  return app
}
