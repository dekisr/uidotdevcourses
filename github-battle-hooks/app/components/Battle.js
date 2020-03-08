import React from 'react'
import ThemeContext from '../contexts/theme'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  FaUserFriends,
  FaFighterJet,
  FaTrophy,
  FaTimesCircle
} from 'react-icons/fa'

function Instructions() {
  const theme = React.useContext(ThemeContext)
  return (
    <div className="instructions-container">
      <h1 className="center-text header-lg">Instructions</h1>
      <ol className="container-sm grid center-text battle-instructions">
        <li>
          <h3 className="header-sm">Enter two GitHub users</h3>
          <FaUserFriends
            className={`bg-${theme}`}
            color="sandybrown"
            size={140}
          />
        </li>
        <li>
          <h3 className="header-sm">Battle</h3>
          <FaFighterJet
            className={`bg-${theme}`}
            color="darkslategrey"
            size={140}
          />
        </li>
        <li>
          <h3 className="header-sm">See the winners</h3>
          <FaTrophy className={`bg-${theme}`} color="gold" size={140} />
        </li>
      </ol>
    </div>
  )
}

function PlayerInput({ label, onSubmit }) {
  const [username, setUsername] = React.useState('')
  const theme = React.useContext(ThemeContext)

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit(username)
  }
  const handleChange = (event) => {
    setUsername(event.target.value)
  }

  return (
    <form className="column player" onSubmit={handleSubmit}>
      <label htmlFor="username" className="player-label">
        {label}
      </label>
      <div className="row player-inputs">
        <input
          type="text"
          id="username"
          placeholder="github username"
          autoComplete="off"
          className={`input-${theme}`}
          value={username}
          onChange={handleChange}
        />
        <button
          type="submit"
          disabled={!username}
          className={`btn ${theme === 'dark' ? 'light-btn' : 'dark-btn'}`}
        >
          Submit
        </button>
      </div>
    </form>
  )
}
PlayerInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
}

function PlayerPreview({ username, onReset, label }) {
  const theme = React.useContext(ThemeContext)

  return (
    <div className="column player">
      <h3 className="player-label">{label}</h3>
      <div className={`row bg-${theme}`}>
        <div className="player-info">
          <img
            src={`https://github.com/${username}.png?size=200`}
            alt={`Avatar for ${username}`}
            className="avatar-small"
          />
          <a href={`https://github.com/${username}`} className="link">
            {username}
          </a>
        </div>
        <button className="btn-clear flex-center" onClick={onReset}>
          <FaTimesCircle color="crimson" size={26} />
        </button>
      </div>
    </div>
  )
}
PlayerPreview.propTypes = {
  username: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
}

export default function Battle() {
  const [playerOne, setPlayerOne] = React.useState(null)
  const [playerTwo, setPlayerTwo] = React.useState(null)

  const handleSubmit = (id, player) =>
    id === 'playerOne' ? setPlayerOne(player) : setPlayerTwo(player)

  const handleReset = (id) =>
    id === 'playerOne' ? setPlayerOne(null) : setPlayerTwo(null)

  return (
    <React.Fragment>
      <Instructions />
      <div className="players-container">
        <h1 className="center-text header-lg">Players</h1>
        <div className="row space-around">
          {playerOne === null ? (
            <PlayerInput
              label="Player One"
              onSubmit={(player) => handleSubmit('playerOne', player)}
            />
          ) : (
            <PlayerPreview
              username={playerOne}
              label="Player One"
              onReset={() => handleReset('playerOne')}
            />
          )}
          {playerTwo === null ? (
            <PlayerInput
              label="Player Two"
              onSubmit={(player) => handleSubmit('playerTwo', player)}
            />
          ) : (
            <PlayerPreview
              username={playerTwo}
              label="Player Two"
              onReset={() => handleReset('playerTwo')}
            />
          )}
        </div>
        {playerOne && playerTwo && (
          <Link
            className="btn dark-btn btn-space"
            to={{
              pathname: '/battle/results',
              search: `?playerOne=${playerOne}&playerTwo=${playerTwo}`
            }}
          >
            Battle
          </Link>
        )}
      </div>
    </React.Fragment>
  )
}
