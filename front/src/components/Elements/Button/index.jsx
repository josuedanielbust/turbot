import React from 'react'
import PropTypes from 'prop-types'

const Button = ({
  type,
  text,
  className,
  onClick,
  disabled,
  ...rest
}) => {
  return (
    <>
      <button
        type={type}
        className={`group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${className}`}
        onClick={onClick}
        disabled={disabled}
        {...rest}
      >
        {text}
      </button>
    </>
  )
}

Button.prototype = {
  type: PropTypes.string,
  text: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
}

Button.defaultProps = {
  type: 'button',
  text: 'Button',
  className: '',
  onClick: () => {},
}

export default Button
