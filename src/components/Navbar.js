import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar(props) {
  return (
    <div>
      
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <h1 className="navbar-brand bg-danger rounded p-2" style={{margin:'6px'}}>Course Manager</h1>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/">Home </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/apply">Apply</Link>
            </li>
            </ul>
            
          <h1>{props.username}</h1>
        </div>
      </nav>
    </div>
  )
}
