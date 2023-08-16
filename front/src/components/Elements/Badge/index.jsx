import React from 'react'
import PropTypes from 'prop-types'

const Badge = ({
  type,
  text,
  className,
  ...rest
}) => {
  let style = ''

  switch (type) {
    case 'success':
      style = 'bg-green-100 text-green-800'
      break
    case 'danger':
      style = 'bg-red-100 text-red-800'
      break
    case 'warning':
      style = 'bg-yellow-100 text-yellow-800'
      break
    case 'info':
      style = 'bg-blue-100 text-blue-800'
      break
    default:
      style = 'bg-blue-100 text-blue-800'
      break
  }

  return (
    <>
      <div className="flex gap-2">
        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${style}`}>
          {text}
        </span>
      </div>
    </>
  )
}

Badge.prototype = {
  type: PropTypes.string,
  text: PropTypes.string,
  className: PropTypes.string,
}

Badge.defaultProps = {
  type: 'button',
  text: 'Button',
  className: '',
}

export default Badge
