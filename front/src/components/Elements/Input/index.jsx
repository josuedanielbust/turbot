import React from 'react'
import PropTypes from 'prop-types'

const Input = ({
  type,
  name,
  title,
  placeholder,
  className,
  value,
  ...rest
}) => {
  return (
    <>
      <label htmlFor={name} className="sr-only">
        {title}
      </label>
      <input
        id={name}
        name={name}
        placeholder={placeholder}
        type={type}
        value={value}
        className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 invalid:border-red-500 invalid:text-red-600 sm:text-sm {className}"
        {...rest}
      />
    </>
  )
}

Input.prototype = {
  type: PropTypes.string,
  name: PropTypes.string,
  title: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.string,
}

Input.defaultProps = {
  type: 'text',
  name: 'input',
  title: 'Input',
  placeholder: 'Input',
  className: '',
  value: '',
}

export default Input
