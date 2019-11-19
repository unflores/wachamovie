import Movie from './movie'

import * as Router from 'koa-router'

const movies = new Router()

movies.get('/', async (ctx, next) => {
  ctx.body = await Movie.find({})
})

export default movies
