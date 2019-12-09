import * as database from './mongoMemory'
process.env.MOVIE_DIR = '/tmp/testmovies/'


before(async () => await database.connect())
after(async () => await database.disconnect())
beforeEach(async () => await database.clear())
