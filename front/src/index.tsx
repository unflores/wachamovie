import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Main from './templates/Main'
import api from './api'

interface Movie {
  name: string
}

interface State {
  movies: Movie[]
}


class App extends React.Component<any, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      movies: undefined
    }
  }

  async componentDidMount() {
    const results = await api.get('/api/movies/')
    console.log(results.data)
    this.setState({ movies: results.data as Movie[] })
  }

  public render() {
    return (
      <Main>
        <div className="row" />
        <div className="row">
          <div className="offset-sm-2" />
          <div className="col-sm-8">
            <table className="table table-striped">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col" />
                  <th scope="col">Options</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>name of some movie</td>
                  <td />
                  <td />
                </tr>
                <tr>
                  <td>name of some movie</td>
                  <td />
                  <td />
                </tr>
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
