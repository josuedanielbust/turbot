import { BACKEND } from '@utils/constants'
import axios from 'axios'

class TasksService {
  constructor() {
  }

  static getTasks = async () => {
    const result = await axios.get(`${BACKEND}/tasks/`)
    .then(res => {
      if (res.status === 200) {
        return res.data
      }
    }).catch(err => {
      throw err
    })
    return result
  }

  static getTask = async (id) => {
    const result = await axios.get(`${BACKEND}/tasks/${id}`)
    .then(res => {
      if (res.status === 200) {
        return res.data
      }
    }).catch(err => {
      throw err
    })
    return result
  }

  static createTask = async (title) => {
    const result = await axios.post(`${BACKEND}/tasks/`, {
      title,
    }).then(res => {
      if (res.status === 200) {
        return res.data
      }
    }).catch(err => {
      throw err
    })
    return result
  }

  static deleteTask = async (id) => {
    const result = await axios.delete(`${BACKEND}/tasks/${id}`)
    .then(res => {
      if (res.status === 200) {
        return res.data
      }
    }).catch(err => {
      throw err
    })
    return result
  }

  static editTask = async (id, title, completed) => {
    const result = await axios.patch(`${BACKEND}/tasks/${id}`, {
      title,
      completed
    }).then(res => {
      if (res.status === 200) {
        return res.data
      }
    }).catch(err => {
      throw err
    })
    return result
  }
}

export default TasksService
