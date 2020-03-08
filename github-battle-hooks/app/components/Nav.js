import React from 'react'
import ThemeContext from '../contexts/theme'
import { NavLink } from 'react-router-dom'

const activeStyle = {
  color: 'tomato'
}

export default function Nav({ toggleTheme }) {
  const theme = React.useContext(ThemeContext)
  return (
    <nav className="row space-between">
      <ul className="row nav">
        <li>
          <NavLink exact to="/" activeStyle={activeStyle} className="nav-link">
            Popular
          </NavLink>
        </li>
        <li>
          <NavLink to="/battle" activeStyle={activeStyle} className="nav-link">
            Battle
          </NavLink>
        </li>
      </ul>
      <button
        style={{ fontSize: 30 }}
        onClick={toggleTheme}
        className="btn-clear"
      >
        {theme === 'light' ? '🔦' : '💡'}
      </button>
    </nav>
  )
}
