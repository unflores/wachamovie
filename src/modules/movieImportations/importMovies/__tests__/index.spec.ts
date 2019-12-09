import { expect } from 'chai'
import importMovies from '../'
import * as fs from 'fs'
import * as path from 'path'

require('../../../../specs/specHelper')
const fileFixtures = [
  'a.tmp',
  'b.tmp'
]
describe('movieImporter', () => {
  beforeEach(() => {
    fs.mkdirSync(path.join(process.env.MOVIE_DIR, 'test'), { recursive: true })
    fileFixtures.forEach((file) => fs.writeFileSync(path.join(process.env.MOVIE_DIR, file), file))
    fileFixtures.forEach((file) => fs.writeFileSync(path.join(process.env.MOVIE_DIR, 'test', file), file))
  })

  afterEach(() => {
    fileFixtures.forEach((file) => fs.unlinkSync(path.join(process.env.MOVIE_DIR, file)))
    fileFixtures.forEach((file) => fs.unlinkSync(path.join(process.env.MOVIE_DIR, 'test', file)))
  })

  it('imports new movies', async () => {
    let movies = await importMovies()

    expect(
      movies.map(movie => movie.name)
    ).to.eql([
      "/tmp/testmovies/a.tmp",
      "/tmp/testmovies/b.tmp",
      "/tmp/testmovies/test/a.tmp",
      "/tmp/testmovies/test/b.tmp"
    ])
  })

  it('does NOT re-import a movie', async () => {
    await importMovies()
    expect(await importMovies()).to.be.empty
  })
})
