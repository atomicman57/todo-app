import express from 'express'
import { TaskController } from '../controllers/task.controller'
import { TaskService } from '../services/task.service'

export default function taskRoutes(db: any) {
  const router = express.Router()

  const taskService = new TaskService(db.taskRepo)
  const taskController = new TaskController(taskService)

  router.get('/', taskController.getAllTasks.bind(taskController))
  router.post('/', taskController.createTask.bind(taskController))
  router.put('/', taskController.reorderTasks.bind(taskController))
  router.put('/:id', taskController.updateTask.bind(taskController))
  router.delete('/:id', taskController.deleteTask.bind(taskController))

  return router
}
