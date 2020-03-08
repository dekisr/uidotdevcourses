import React from 'react'
import ThemeContext from '../contexts/theme'
import PropTypes from 'prop-types'

export default function Card({
  header,
  subheader,
  avatar,
  link,
  name,
  children
}) {
  const theme = React.useContext(ThemeContext)
  return (
    <div className={`card bg-${theme}`}>
      <h4 className="header-lg center-text">{header}</h4>
      <img src={avatar} alt={`Avatar of ${name}`} className="avatar" />
      {subheader && <h4 className="center-text">{subheader}</h4>}
      <h2 className="center-text">
        <a href={link} className="link">
          {name}
        </a>
      </h2>
      {children}
    </div>
  )
}

Card.propTypes = {
  header: PropTypes.string.isRequired,
  subheader: PropTypes.string,
  avatar: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
}
