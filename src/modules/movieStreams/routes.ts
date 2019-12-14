import Movie from '../movies/movie'

import * as Router from 'koa-router'
import * as fs from 'fs'
import * as path from 'path'
import { getHeaderChunk } from '../../webserver/http'

const movieStreams = new Router()

movieStreams.get('/:id', async (ctx, next) => {
  const movie = await Movie.findOne({ _id: ctx.params.id })

  const filePath = path.join(process.env.MOVIE_DIR, movie.file)
  const chunk = getHeaderChunk(ctx.req.headers.range, filePath)

  if (!chunk) {
    ctx.res.statusCode = 416
    ctx.body = 'Browser must support file chunking.'
    return
  }

  if (chunk.start >= chunk.fileSize) {
    ctx.res.statusCode = 416
    ctx.body = 'Requested range not satisfiable\n' + chunk.start + ' >= ' + chunk.fileSize
    return
  }

  const file = fs.createReadStream(filePath, { start: chunk.start, end: chunk.end })
  const head = {
    'Content-Range': `bytes ${chunk.start}-${chunk.end}/${chunk.fileSize}`,
    'Accept-Ranges': 'bytes',
    'Content-Length': chunk.size,
    'Content-Type': 'video/mkv',
  }

  ctx.res.writeHead(206, head)
  ctx.body = file
})

export default movieStreams
