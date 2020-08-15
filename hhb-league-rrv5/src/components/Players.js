import * as React from 'react'
import {
  Route,
  Switch,
  Link,
  useLocation,
  useRouteMatch,
  useParams,
} from 'react-router-dom'
import { parse } from 'query-string'
import slug from 'slug'
import usePlayers from '../hooks/usePlayers'
import Sidebar from './Sidebar'

const Player = ({ players }) => {
  const { playerId } = useParams()
  const player = players.find(({ name }) => slug(name) === playerId)

  return (
    <div className="panel">
      <img
        className="avatar"
        src={`${player.avatar}`}
        alt={`${player.name}'s avatar`}
      />
      <h1 className="medium-header">{player.name}</h1>
      <h3 className="header">#{player.number}</h3>
      <div className="row">
        <ul className="info-list" style={{ marginRight: 80 }}>
          <li>
            Team
            <div>
              <Link to={`/${player.teamId}`}>
                {player.teamId[0].toUpperCase() + player.teamId.slice(1)}
              </Link>
            </div>
          </li>
          <li>
            Position<div>{player.position}</div>
          </li>
          <li>
            PPG<div>{player.ppg}</div>
          </li>
        </ul>
        <ul className="info-list">
          <li>
            APG<div>{player.apg}</div>
          </li>
          <li>
            SPG<div>{player.spg}</div>
          </li>
          <li>
            RPG<div>{player.rpg}</div>
          </li>
        </ul>
      </div>
    </div>
  )
}

const Players = () => {
  const location = useLocation()
  const { path, url } = useRouteMatch()
  const team = location.search ? parse(location.search).teamId : null
  const { loading, response: players } = usePlayers(team)

  return loading ? (
    <p>LOADING</p>
  ) : (
    <div className="container two-column">
      <Sidebar title="Players" list={players.map((player) => player.name)} />
      <Switch>
        <Route path={`${path}/:playerId`}>
          <Player players={players} />
        </Route>
        <Route path="*">
          <div className="sidebar-instruction">Select a Player</div>
        </Route>
      </Switch>
    </div>
  )
}

export default Players
