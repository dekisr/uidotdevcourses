import React from 'react'
import { Link, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import slug from 'slug'
import Loading from './Loading'

export default function Sidebar({ title, list, loading, location, match }) {
  // prettier-ignore
  return loading === true
  ? <Loading text="Loading" />
  : <div>
      <h3 className="header">{title}</h3>
      <ul className="sidebard-list">
        {list.map((item) => (
          <CustomLink
            key={item}
            to={{
              pathname: `${match.url}/${slug(item)}`,
              search: location.search
            }}>
            {item.toUpperCase()}
          </CustomLink>
        ))}
      </ul>
    </div>
}

function CustomLink({ to, children }) {
  return (
    <Route
      path={to.pathname}
      children={({ match }) => (
        <li
          style={{
            listStyleType: 'none',
            fontWeight: match ? 'bold' : 'normal'
          }}
        >
          <Link to={to}>{children}</Link>
        </li>
      )}
    />
  )
}

Sidebar.propTypes = {
  title: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
}
