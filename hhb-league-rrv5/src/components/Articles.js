import * as React from 'react'
import { useParams, Switch, Route, useRouteMatch } from 'react-router-dom'
import useTeamsArticles from '../hooks/useTeamsArticles'
import useArticle from '../hooks/useArticle'
import Sidebar from './Sidebar'

const Article = () => {
  const { teamId, articleId } = useParams()
  const { response: article, loading } = useArticle({ teamId, articleId })
  return loading ? null : (
    <div className="panel">
      <article className="article">
        <h1 className="header">{article.title}</h1>
        <p>{article.body}</p>
      </article>
    </div>
  )
}

const Articles = () => {
  const { teamId } = useParams()
  const { path } = useRouteMatch()
  const { response: articles, loading } = useTeamsArticles(teamId)

  return loading ? (
    <p>LOADING</p>
  ) : (
    <div className="container two-column">
      <Sidebar
        title="Articles"
        list={articles.map((article) => article.title)}
      />
      <Switch>
        <Route path={`${path}/:articleId`}>
          <Article />
        </Route>
        <Route path="*">
          <div className="sidebar-instruction">Select an Article</div>
        </Route>
      </Switch>
    </div>
  )
}

export default Articles
