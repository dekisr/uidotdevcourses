import React from 'react'
import Card from './Card'
import Tooltip from './Tooltip'
import Loading from './Loading'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { Link } from 'react-router-dom'
import { battle } from '../utils/api'
import {
  FaCompass,
  FaBriefcase,
  FaUsers,
  FaUser,
  FaUserFriends,
  FaCode
} from 'react-icons/fa'

function ProfileList({ profile }) {
  return (
    <ul className="card-list">
      <li>
        <FaUser color="lightcoral" size={22} />
        {profile.name}
      </li>
      {profile.location && (
        <li>
          <Tooltip text="User's location">
            <FaCompass color="violet" size={22} />
            {profile.location}
          </Tooltip>
        </li>
      )}
      {profile.company && (
        <li>
          <Tooltip text="User's company">
            <FaBriefcase color="sienna" size={22} />
            {profile.company}
          </Tooltip>
        </li>
      )}
      <li>
        <FaUsers color="powderblue" size={22} />
        {profile.followers.toLocaleString()}
      </li>
      <li>
        <FaUserFriends color="mediumaquamarine" size={22} />
        {profile.following.toLocaleString()}
      </li>
    </ul>
  )
}
ProfileList.propTypes = {
  profile: PropTypes.object.isRequired
}

export default class Results extends React.Component {
  state = {
    winner: null,
    loser: null,
    error: null,
    loading: true
  }
  componentDidMount() {
    const { playerOne, playerTwo } = queryString.parse(
      this.props.location.search
    )
    battle([playerOne, playerTwo])
      .then((players) => {
        this.setState({
          winner: players[0],
          loser: players[1],
          error: null,
          loading: false
        })
      })
      .catch(({ message }) => {
        this.setState({
          error: message,
          loading: false
        })
      })
  }
  render() {
    const { winner, loser, error, loading } = this.state
    if (loading === true) {
      return <Loading />
    }
    if (error) {
      return <p className="center-text error">{error}</p>
    }
    return (
      <React.Fragment>
        <div className="grid space-around container-sm">
          <Card
            header={winner.score === loser.score ? 'Tie' : 'Winner'}
            subheader={`Score: ${winner.score.toLocaleString()}`}
            avatar={winner.profile.avatar_url}
            link={winner.profile.html_url}
            name={winner.profile.login}
          >
            <ProfileList profile={winner.profile} />
          </Card>
          <Card
            header={loser.score === winner.score ? 'Tie' : 'Loser'}
            subheader={`Score: ${loser.score.toLocaleString()}`}
            avatar={loser.profile.avatar_url}
            link={loser.profile.html_url}
            name={loser.profile.login}
          >
            <ProfileList profile={loser.profile} />
          </Card>
        </div>
        <Link to="/battle" className="btn dark-btn btn-space">
          Reset
        </Link>
      </React.Fragment>
    )
  }
}
// Results.propTypes = {
//   playerOne: PropTypes.string.isRequired,
//   playerTwo: PropTypes.string.isRequired,
//   onReset: PropTypes.func.isRequired
// }
