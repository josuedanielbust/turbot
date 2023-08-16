import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Table = ({
  data,
  titles,
  actions,
  ...rest
}) => {
  const [columns, setColumns] = useState(titles)

  return (
    <>
      <section className="container px-4 mx-auto">
        <div className="flex flex-col mt-6">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      {columns.map((column, key) => {
                        return <th key={key} scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">{column.title}</th>
                      })}
                      {actions.length > 0 ? (
                        <th scope="col" className="relative py-3.5 px-4">
                          <span className="sr-only">Action</span>
                        </th>
                      ) : null}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                    {data.map((row, key) => {
                      return (
                        <tr key={key}>
                          {columns.map((column, key) => {
                            return (
                              <td key={key} className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                {typeof row[column.field] === 'object' ? (
                                  row[column.field]
                                ): (
                                  <div>
                                    <p className="font-medium text-gray-800 dark:text-white ">{row[column.field]}</p>
                                  </div>
                                )}
                              </td>
                            )
                          })}
                          <td className="px-4 py-4 text-sm whitespace-nowrap">
                            <div className="flex gap-2 items-center justify-center">
                              {actions.map((action, key) => {
                                return (
                                  <button key={key} className="gap-2 text-gray-400 hover:text-gray-600" onClick={(event) => action.onClick(event, row)}>
                                    {action.icon}
                                  </button>
                                )
                              })}
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

Table.prototype = {
  data: PropTypes.array,
  titles: PropTypes.array,
  actions: PropTypes.array,
}

Table.defaultProps = {
  data: [],
  titles: [],
  actions: [],
}

export default Table
