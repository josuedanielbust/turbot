import '../styles/globals.css'
import React from 'react'

// This default export is required in a new `pages/_app.js` file.
function TodoApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default TodoApp
