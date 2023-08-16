import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '@components/Layout'
import Input from '@components/Elements/Input'
import Button from '@components/Elements/Button'
import TaskService from '@/services/tasks'

const CreateTask = (props) => {
  const router = useRouter()
  
  const [title, setTitle] = useState('')
  const [disabledButtons, setDisabledButtons] = useState(false)
  const [error, setError] = useState('')

  const createTask = async (e) => {
    e.preventDefault()
    setDisabledButtons(true)
    const result = await TaskService.createTask(title)
    if (!result.title) {
      setError('Error creating todo')
      return
    }
    router.push('/')
    setDisabledButtons(false)
    return result
  }

  return (
    <Layout>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Add Todo
            </h2>
          </div>
        </div>
      </div>

      <form className="mt-8 space-y-6" action="#" method="POST">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm">
            <div className="my-4">
              <Input
                type="text"
                name="title"
                title="Title"
                placeholder="Title"
                value={title}
                required
                onChange={e => setTitle(e.target.value)}
              ></Input>
            </div>
          </div>
          {error ? (
            <div className="-space-y-px rounded-md shadow-sm">
              <div className="mt-4 mb-4 py-4 px-6">
                <p>{error}</p>
              </div>
            </div>
          ) : null}
          <div>
            <Button
              onClick={e => createTask(e)}
              text="Create Package"
              disabled={disabledButtons}
            ></Button>
          </div>
        </form>
    </Layout>
  )
}

export default CreateTask
