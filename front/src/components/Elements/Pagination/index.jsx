import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline'

const Pagination = ({
  count,
  offset,
  take,
  action,
}) => {
  const [pages, setPages] = useState(Math.ceil(count / take))
  const [page, setPage] = useState(offset / take)

  const handlePagination = (e, newOffset) => {
    e.preventDefault()
    if (page == newOffset && newOffset <= 0) {
      newOffset = 0
      return
    }
    if (page == newOffset && newOffset >= pages) {
      newOffset = pages
      return
    }
    setPage(newOffset)
    action(newOffset)
  }

  return (
    <>
      <div className="max-w-2xl mx-auto mt-10 mb-4">
        <nav>
          <ul className="flex -space-x-px align-center justify-center">
            <li>
              <button onClick={(e) => handlePagination(e, page - 1)} className="flex items-center justify-center text-sm capitalize transition-colors duration-200 bg-white border text-gray-500 hover:bg-gray-100 ml-0 rounded-l-lg leading-tight py-2 px-3 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                <ArrowLeftIcon className="h-3 w-3 color-white mr-2" aria-hidden="true"/>
                <span>Previous</span>
              </button>
            </li>
            {Array.from({ length: pages }, (value, index) => {return index}).map((page, key) => (
              <li key={key}>
                <button onClick={(e) => handlePagination(e, page)} className="flex items-center justify-center text-sm capitalize transition-colors duration-200 bg-white border text-gray-500 hover:bg-gray-100 leading-tight py-2 px-3 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                  <span>{page + 1}</span>
                </button>
              </li>
            ))}
            <li>
              <button onClick={(e) => handlePagination(e, page + 1)} className="flex items-center justify-center text-sm capitalize transition-colors duration-200 bg-white border text-gray-700 hover:bg-gray-100 rounded-r-lg leading-tight py-2 px-3 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                <span>Next</span>
                <ArrowRightIcon className="h-3 w-3 color-white ml-2" aria-hidden="true"/>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  )
}

Pagination.prototype = {
  count: PropTypes.number,
  offset: PropTypes.number,
  take: PropTypes.number,
  action: PropTypes.func,
}

Pagination.defaultProps = {
  count: 0,
  offset: 0,
  take: 0,
  action: () => {},
}

export default Pagination
