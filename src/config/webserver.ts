const Router = require('koa-router')
const send = require('koa-send')
const serve = require('koa-static')
const mount = require('koa-mount')
const path = require('path')

/**
 * Configure the server app with default configuration
 *
 * @export
 * @param {Object} app application
 * @returns {Object} Configured web application
 */
export function configure(app) {
  const router = new Router()

  app.use(mount('/assets', serve(path.resolve('front/assets'))))
  router.get('/', async (ctx) => await send(ctx, 'front/assets/index.html'))
  app.use(router.routes())

  const port = process.env.PORT || '9090'
  app.context.port = port
  return app
}
