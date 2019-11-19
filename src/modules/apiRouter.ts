import * as Router from 'koa-router'
import movies from './movies/routes'

const api = new Router({ prefix: '/api' })

api.use('/movies', movies.routes())

export default api
