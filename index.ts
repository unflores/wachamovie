const Koa = require('koa')
const Router = require('koa-router')
const send = require('koa-send')
const serve = require('koa-static')
const mount = require('koa-mount')
const path = require('path')

const app = new Koa()
const router = new Router()
app.use(mount('/assets', serve(path.resolve('front/assets'))))
router.get('/', async (ctx) => await send(ctx, 'front/assets/index.html'))

app.use(router.routes())
const port = process.env.PORT || '9090'
app.listen(port)
