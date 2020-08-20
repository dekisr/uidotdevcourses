import * as React from 'react'

const Loading = ({text = 'Loading'}) => {
  const [content, setContent] = React.useState(text)

  React.useEffect(() => {
    const id = window.setInterval(() => {
      setContent((content) => {
        return content === `${text}...`
          ? text
          : `${content}.`
      })
    }, 300)
    return () => window.clearInterval(id)
  }, [text])

  return (
    <div className="container">
      <p className="text-center">
        {content}
      </p>
    </div>
  )

}

export default Loading