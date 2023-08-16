import TasksModel from '../models/tasks.js'

const getTasks = async (request, reply) => {
  const { offset = 0, take = 10 } = request.query
  const tasks = await TasksModel.getTasks(reply.server, offset, take)
  reply.send(tasks)
}

const getTask = async (request, reply) => {
  const { id } = request.params
  const entry = await TasksModel.getTask(reply.server, parseInt(id, 10))
  if (!entry) {
    reply.code(404).send({ error: 'Task not found' })
    return
  }
  reply.send(entry)
}

const createTask = async (request, reply) => {
  const { title } = request.body
  if (!title) {
    reply.code(400).send({ error: 'Missing required fields' })
    return
  }
  const data = {
    ...request.body,
  }
  const entry = await TasksModel.createTask(reply.server, data)
  reply.send(entry)
}

const updateTask = async (request, reply) => {
  const { id } = request.params
  const entry = await TasksModel.updateTask(reply.server, parseInt(id, 10), request.body)
  reply.send(entry)
}

const deleteTask = async (request, reply) => {
  const { id } = request.params
  const entry = await TasksModel.deleteTask(reply.server, parseInt(id, 10))
  reply.send(entry)
}

const Tasks = {
  model: TasksModel,
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
}

export default Tasks
