import Movie from '../../movies/movie'
import { readdirSync } from 'fs'

// read file names from loaded config.moviesLocation
// find all filenames in mongoose where listed in read filenames
// remove listed filenames in mongoose from set
// load new movies to db

const findNewMovies = async () => {
  const movieNames = readdirSync(process.env.MOVIE_DIR)
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

  return Promise.all(
    movies.map(async (movie) => {
      try {
        return await Movie.create({
          file: movie,
          name: movie
        })
      } catch (error) {
        console.log(error)
      }
    })
  )
}
