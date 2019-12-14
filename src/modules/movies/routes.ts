import Movie from './movie'

import * as Router from 'koa-router'

const movies = new Router()

movies.get('/', async (ctx, next) => {
  const movies = await Movie.find({})

  console.log({ movies })
  ctx.body = movies
})

export default movies
