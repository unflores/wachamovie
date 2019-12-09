import Movie from '../../movies/movie'
import * as globby from 'globby'
import filenameToAttributes from './filenameToAttributes'
import * as path from 'path'

// read file names from loaded config.moviesLocation
// find all filenames in mongoose where listed in read filenames
// remove listed filenames in mongoose from set
// load new movies to db

const findNewMovies = async () => {
  const movieNames = await globby([path.join(process.env.MOVIE_DIR, '/**/*')])
  const storedMovies = await Movie.find({ file: { $in: movieNames } }).exec()
  const storedMovieNames = storedMovies.map(movie => movie.name)

  return movieNames.filter(
    movieName => !storedMovieNames.includes(movieName)
  )
}

/**
 * Adds new movies from the config.moviesLocation dir.
 *
 */
export default async () => {
  const movies = await findNewMovies()
  return await Promise.all(
    movies.map(async (movie) => {
      const atts = filenameToAttributes(movie)
      try {
        return await Movie.create({
          file: movie,
          name: movie,
          ...atts
        })
      } catch (error) {
        console.error(error)
      }
    })
  )
}
