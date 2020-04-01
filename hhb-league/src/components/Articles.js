import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { getTeamsArticles } from '../api'
import Sidebar from './Sidebar'
import Article from './Article'
import Loading from './Loading'

export default class Articles extends Component {
  state = {
    loading: true,
    teamArticles: []
  }
  componentDidMount() {
    getTeamsArticles(this.props.match.params.teamId).then((teamArticles) => {
      this.setState({
        loading: false,
        teamArticles: teamArticles.map((article) => article.title)
      })
    })
  }

  render() {
    const { loading, teamArticles } = this.state
    const { params, url } = this.props.match
    return loading === true ? (
      <Loading text="Loading" />
    ) : (
      <div className="container two-column">
        <Sidebar
          loading={loading}
          title="Articles"
          list={teamArticles}
          {...this.props}
        ></Sidebar>
        <Route
          path={`${url}/:articleId`}
          render={({ match }) => (
            <Article articleId={match.params.articleId} teamId={params.teamId}>
              {(article) =>
                !article ? (
                  <Loading text="Loading" />
                ) : (
                  <div className="panel">
                    <article className="article" key={article.id}>
                      <h1 className="header">{article.title}</h1>
                      <p>{article.body}</p>
                    </article>
                  </div>
                )
              }
            </Article>
          )}
        />
      </div>
    )
  }
}
