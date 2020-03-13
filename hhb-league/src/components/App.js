import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './Home'
import Players from './Players'
import Teams from './Teams'
import Navbar from './Navbar'
import TeamPage from './TeamPage'

export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/players" component={Players} />
            <Route path="/teams" component={Teams} />
            <Route exact path="/:teamId" component={TeamPage} />
            <Route
              render={() => <h1 className="text-center">Four oh Four.</h1>}
            />
          </Switch>
        </div>
      </Router>
    )
  }
}
