import Movie from '../movie'
import config from '../../../config/config'
import { readdirSync } from 'fs'

// read file names from loaded config.moviesLocation
// find all filenames in mongoose where listed in read filenames
// remove listed filenames in mongoose from set
// load new movies to db

const findNewMovies = async () => {
  const movieNames = readdirSync(config.moviesLocation)

  const storedMovies = await Movie.find({ file: { $in: movieNames } }).exec()
  const storedMovieNames = storedMovies.map(movie => movie.name)

  return movieNames.filter(
    movieName => !storedMovieNames.includes(movieName)
  )
}

export default async () => {
  const movies = await findNewMovies()

  return movies.map(async (movie) => {
    try {
      await Movie.create({
        file: movie,
        name: movie
      })
      return movie
    } catch (error) {
      console.log(error)
    }
  })
}
