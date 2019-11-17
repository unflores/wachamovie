
import importMovies from '..'
import { expect } from 'chai'

require('../../../../specs/specHelper')

console.log('in importMovies spec')

describe('movieImporter', () => {
  beforeEach(() => {

  })

  it('imports new movies', async () => {
    expect(await importMovies()).to.eql(['name1', 'name2'])
  })

  it('does NOT re-import a movie', async () => {
    await importMovies()
    expect(await importMovies()).to.be.empty
  })
})
