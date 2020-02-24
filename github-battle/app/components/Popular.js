import React from 'react'

export default class Popular extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedLanguage: 'All'
    }
    this.updateLanguage = this.updateLanguage.bind(this)
  }

  updateLanguage(selectedLanguage) {
    this.setState({ selectedLanguage })
  }

  render() {
    const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python']
    return (
      <React.Fragment>
        <ul className="flex-center">
          {languages.map((language) => (
            <li key={language}>
              <button
                className="btn-clear nav-link"
                style={
                  language === this.state.selectedLanguage
                    ? { color: 'tomato' }
                    : null
                }
                onClick={() => this.updateLanguage(language)}
              >
                {language}
              </button>
            </li>
          ))}
        </ul>
        {this.state.selectedLanguage}
      </React.Fragment>
    )
  }
}
