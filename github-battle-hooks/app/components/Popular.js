import React from 'react'
import Card from './Card'
import Tooltip from './Tooltip'
import Loading from './Loading'
import PropTypes from 'prop-types'
import { fetchPopularRepos } from '../utils/api'
import {
  FaUser,
  FaStar,
  FaCodeBranch,
  FaExclamationTriangle
} from 'react-icons/fa'

function LanguagesNav({ selected, onUpdateLanguage }) {
  const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python']
  return (
    <ul className="flex-center">
      {languages.map((language) => (
        <li key={language}>
          <button
            className="btn-clear nav-link"
            style={language === selected ? { color: 'tomato' } : null}
            onClick={() => onUpdateLanguage(language)}
          >
            {language}
          </button>
        </li>
      ))}
    </ul>
  )
}
LanguagesNav.propTypes = {
  selected: PropTypes.string.isRequired,
  onUpdateLanguage: PropTypes.func.isRequired
}

function ReposGrid({ repos }) {
  return (
    <ul className="grid space-around">
      {repos.map((repo, index) => {
        const {
          name,
          owner,
          html_url,
          stargazers_count,
          forks,
          open_issues
        } = repo
        const { login, avatar_url } = owner
        return (
          <li key={html_url}>
            <Card
              header={`#${index + 1}`}
              avatar={avatar_url}
              link={html_url}
              name={login}
            >
              <ul className="card-list">
                <li>
                  <Tooltip text="Github username">
                    <FaUser color="sandybrown" size={22} />
                    <a href={`https://github.com/${login}`}>{login}</a>
                  </Tooltip>
                </li>
                <li>
                  <FaStar color="gold" size={22} />
                  {stargazers_count.toLocaleString()} stars
                </li>
                <li>
                  <FaCodeBranch color="cornflowerblue" size={22} />
                  {forks.toLocaleString()} forks
                </li>
                <li>
                  <FaExclamationTriangle color="lightcoral" size={22} />
                  {open_issues.toLocaleString()} open issues
                </li>
              </ul>
            </Card>
          </li>
        )
      })}
    </ul>
  )
}
ReposGrid.propTypes = {
  repos: PropTypes.array.isRequired
}

function popularReducer(state, action) {
  switch (action.type) {
    case 'success':
      return {
        ...state,
        [action.selectedLanguage]: action.repos,
        error: null
      }
    case 'error':
      return {
        ...state,
        error: action.error.message
      }
    default:
      throw new Error(`That action type isn't supported.`)
  }
}
export default function Popular() {
  const [selectedLanguage, setSelectedLanguage] = React.useState('All')
  const [state, dispatch] = React.useReducer(popularReducer, { error: null })

  const fetchedLanguages = React.useRef([])

  React.useEffect(() => {
    if (fetchedLanguages.current.includes(selectedLanguage) === false) {
      fetchedLanguages.current.push(selectedLanguage)
      fetchPopularRepos(selectedLanguage)
        .then((data) =>
          dispatch({ type: 'success', selectedLanguage, repos: data })
        )
        .catch((error) => dispatch({ type: 'error', error }))
    }
  }, [fetchedLanguages, selectedLanguage])

  const isLoading = () => {
    return !state[selectedLanguage] && state.error === null
  }
  return (
    <React.Fragment>
      <LanguagesNav
        selected={selectedLanguage}
        onUpdateLanguage={setSelectedLanguage}
      />
      {isLoading() && <Loading text="Fetching Repos" />}
      {state.error && <p className="center-text error">{state.error}</p>}
      {state[selectedLanguage] && !state.error && <ReposGrid repos={state[selectedLanguage]} />}
    </React.Fragment>
  )
}
