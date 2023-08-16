import React, { useState, useEffect } from 'react'
import Layout from '@components/Layout'
import Table from '@components/Elements/Table'
import Pagination from '@components/Elements/Pagination'
import TasksService from '@/services/tasks'
import Badge from '@components/Elements/Badge'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'

const tasksMapper = async (tasks) => {
  return tasks.map((task) => {
    return {
      id: task.id,
      title: task.title,
      completed: task.completed,
    }
  })
}

export const getServerSideProps = async () => {
  const tasks = await TasksService.getTasks()
  const tasksMapped = await tasksMapper(tasks)

  return { props: {
    columns: [
      { title: 'Id', field: 'id' },
      { title: 'Title', field: 'title' },
      { title: 'Status', field: 'badge' },
    ],
    tasks: tasksMapped,
  }}
}

const Tasks = (props) => {
  const { columns, tasks, count, offset, take } = props
  const [data, setData] = useState(tasks)

  const generateBadge = (status) => {
    return <Badge
      text={status ? 'Completed' : 'Pending'}
      type={status ? 'success' : 'danger'}
    />
  }

  const toggleTask = (task, taskId) => {
    return {
      ...task,
      badge: task.id === taskId ? generateBadge(!task.completed) : task.badge,
    }
  }

  useEffect(() => {
    setData(
      tasks?.map((task) => {
        return {
          ...task,
          badge: generateBadge(task.completed),
        }
      })
    )
  }, [tasks])

  const handleComplete = async (row) => {
    const result = await TasksService.editTask(row.id, row.title, true)
    if (result.completed) {
      setData(
        data.map((task) => {
          return toggleTask(task, row.id)
        })
      )
    }
  }

  const handleDelete = async (row) => {
    const result = await TasksService.deleteTask(row.id)
    if (result) {
      setData(
        data.filter((task) => {
          return task.id !== row.id
        })
      )
    }
  }

  const actions = [
    {
      icon: <CheckCircleIcon className="h-6 w-6 color-white" aria-hidden="true"/>,
      tooltip: 'Complete task',
      onClick: (event, row) => handleComplete(row)
    },
    {
      icon: <XCircleIcon className="h-6 w-6 color-white" aria-hidden="true"/>,
      tooltip: 'Delete task',
      onClick: (event, row) => handleDelete(row)
    },
  ]

  const paginationAction = async (newOffset) => {
    const tasks = await TasksService.getTasks(newOffset, take)
    const tasksMapped = await tasksMapper(tasks)
    setData(tasksMapped)
  }

  return (
    <Layout>
      <Table data={data} titles={columns} actions={actions} />
      <Pagination count={count} offset={offset} take={take} action={paginationAction}/>
    </Layout>
  )
}

export default Tasks
