import importMovies from './importMovies'

import * as Router from 'koa-router'

const router = new Router()

router.get('/', async (ctx, next) => {
  await importMovies()
  ctx.status = 200
  ctx.body = {}
})

export default router
