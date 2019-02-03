import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Main from './templates/Main'

class App extends React.Component<any, any> {
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
