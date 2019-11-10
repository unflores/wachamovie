require('dotenv').config()
import * as repl from 'repl'
import connectDatabase from '../config/database'
import Movie from '../modules/movies/movie'

connectDatabase()

const replServer = repl.start('> ')

replServer.context.Movie = Movie
