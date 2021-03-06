import * as mongoose from 'mongoose'

interface Movie {
  name: string;
  file: string;
}

export interface MovieModel extends Movie, mongoose.Document { }

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    index: true,
    required: true
  },
  file: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: false
  },
  resolution: {
    type: String,
    required: false
  }
})

export default mongoose.model<MovieModel>('Movie', movieSchema)
