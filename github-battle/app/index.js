import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

// Component
// State
// Lifecycle
// UI

export default class App extends React.Component {
  render() {
    return <div>Hello F. World!</div>
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)