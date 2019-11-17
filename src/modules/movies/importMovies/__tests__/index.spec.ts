import { expect } from 'chai'
import * as fs from 'fs'
import * as sinon from 'sinon'
import importMovies from '../'

require('../../../../specs/specHelper')

describe('movieImporter', () => {
  beforeEach(() => {
    sinon.replace(
      fs,
      'readdirSync',
      (_string) => ['name1', 'name2']
    )
  })
  afterEach(() => {
    sinon.restore()
  })

  it('imports new movies', async () => {
    let movies = await importMovies()
    expect(movies.map(movie => movie.name)).to.eql(['name1', 'name2'])
  })

  it('does NOT re-import a movie', async () => {
    await importMovies()
    expect(await importMovies()).to.be.empty
  })
})
