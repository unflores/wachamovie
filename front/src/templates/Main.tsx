import * as React from 'react'

interface Props {
  children: any
}

const Main: React.FunctionComponent<Props> = ({ children }) => (
  <div>
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand">WachaMovie</a>
      </nav>
    </header>

    <div className="container-fluid">{children}</div>
  </div>
)

export default Main
