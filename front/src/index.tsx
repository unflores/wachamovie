import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Main from './templates/Main'
import api from './api'
import MovieModal from './MovieModal'

interface Movie {
  name: string
  _id: string
}

interface State {
  movies: Movie[]
  isModalVisible: boolean
  shownFile: string
}

class App extends React.Component<any, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      movies: [],
      isModalVisible: false,
      shownFile: undefined
    }
  }

  fetchMovies = async () => {
    return await api.get<Movie[]>('/api/movies/')
  }

  importMovies = async () => {
    return await api.get<Movie[]>('/api/movie_importations/')
    const results = await this.fetchMovies()
    this.setState({ movies: results.data })
  }

  hideModal = () => {
    this.setState({ isModalVisible: false });
  }

  openMovie = (name: string) => {
    console.log('hai')
    this.setState({ isModalVisible: true, shownFile: `/files/${name}` })
  }

  async componentDidMount() {
    const results = await this.fetchMovies()
    this.setState({ movies: results.data })
  }

  public render() {
    return (
      <Main>
        <div className="row" />
        <div className="row">
          <MovieModal
            show={this.state.isModalVisible}
            handleClose={this.hideModal}
            file={this.state.shownFile}
          />
          <div className="offset-sm-2" />
          <div className="col-sm-8">
            <table className="table table-striped">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col" />
                  <th scope="col">Options</th>
                  <th scope="col">
                    <button onClick={this.importMovies}>Import movies</button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.state.movies.map((movie) =>
                  <tr key={movie._id}>
                    <td onClick={() => this.openMovie(movie.name)}>{movie.name}</td>
                    <td />
                    <td />
                    <td />
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="offset-sm-2" />
        </div>
      </Main>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
