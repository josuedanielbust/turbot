import TasksService from '../services/tasks.js'

const Tasks = {
  service: TasksService,
}

Tasks.routes = async (Fastify) => {
  Fastify.get('/tasks/', Tasks.service.getTasks)
  Fastify.get('/tasks/:id', Tasks.service.getTask)
  Fastify.post('/tasks/', Tasks.service.createTask)
  Fastify.patch('/tasks/:id', Tasks.service.updateTask)
  Fastify.delete('/tasks/:id', Tasks.service.deleteTask)
}

export default Tasks.routes
