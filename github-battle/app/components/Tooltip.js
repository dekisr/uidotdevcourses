import React from 'react'
// import withHover from './withHover'
import Hover from './Hover'
import PropTypes from 'prop-types'

const styles = {
  container: {
    position: 'relative',
    display: 'flex'
  },
  tooltip: {
    boxSizing: 'border-box',
    position: 'absolute',
    width: '160px',
    bottom: '100%',
    left: '50%',
    marginLeft: '-80px',
    borderRadius: '3px',
    backgroundColor: 'hsla(0, 0%, 20%, 0.9)',
    padding: '7px',
    marginBottom: '5px',
    color: '#fff',
    textAlign: 'center',
    fontSize: '14px'
  }
}

// function Tooltip({ text, hover, children }) {
function Tooltip({ text, children }) {
  return (
    // <div style={styles.container}>
    //   {hover === true && <div style={styles.tooltip}>{text}</div>}
    //   {children}
    // </div>
    <Hover>
      {(hover) => (
        <div style={styles.container}>
          {hover === true && <div style={styles.tooltip}>{text}</div>}
          {children}
        </div>
      )}
    </Hover>
  )
}

Tooltip.propTypes = {
  text: PropTypes.string.isRequired
  // hover: PropTypes.bool.isRequired
}

// export default withHover(Tooltip, 'hover')
export default Tooltip
