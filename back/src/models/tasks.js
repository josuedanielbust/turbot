const getTasks = async (Fastify, offset, take) => {
  const tasks = await Fastify.db.tasks.findMany({
    skip: offset * take,
    take: take,
  })
  return tasks
}

const getTask = async (Fastify, id) => {
  const task = await Fastify.db.tasks.findUnique({
    where: {
      id: id,
    },
  })
  return task
}

const createTask = async (Fastify, data) => {
  const task = await Fastify.db.tasks.create({
    data: data,
  })
  return task
}

const updateTask = async (Fastify, id, data) => {
  const task = await Fastify.db.tasks.update({
    where: {
      id: id,
    },
    data: data,
  })
  return task
}

const deleteTask = async (Fastify, id) => {
  const task = await Fastify.db.tasks.delete({
    where: {
      id: id,
    },
  })
  return task
}

const Tasks = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
}

export default Tasks
