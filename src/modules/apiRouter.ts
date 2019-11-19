import * as Router from 'koa-router'
import movies from './movies/routes'
import movieImportations from './movieImportations/routes'

const api = new Router({ prefix: '/api' })

api.use('/movies', movies.routes())
api.use('/movie_importations', movieImportations.routes())
export default api
