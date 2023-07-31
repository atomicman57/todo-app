import { Request, Response } from 'express'
import { Task } from '../types/task.type'
import { TaskService } from '../services/task.service'
import { errorHandler } from '../utils/errors'

export class TaskController {
  private taskService: TaskService

  constructor(taskService: TaskService) {
    this.taskService = taskService
  }

  async getAllTasks(req: Request, res: Response) {
    try {
      const todos = await this.taskService.findAll()
      res.send({ todos })
    } catch (error) {
      errorHandler(error, res)
    }
  }

  async createTask(req: Request, res: Response) {
    try {
      const task: Task = req.body
      const createdTask = await this.taskService.create(task)
      res.status(201).send({ todo: createdTask })
    } catch (error) {
      errorHandler(error, res)
    }
  }

  async updateTask(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10)
      const taskUpdates: Partial<Task> = req.body
      const updatedTask = await this.taskService.update(id, taskUpdates)
      res.send({ task: updatedTask })
    } catch (error) {
      errorHandler(error, res)
    }
  }

  async deleteTask(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10)
      await this.taskService.delete(id)
      res.send({ message: `Task with id ${id} deleted` })
    } catch (error) {
      errorHandler(error, res)
    }
  }

  async reorderTasks(req: Request, res: Response) {
    try {
      const todos: Task[] = req.body.todos
      await this.taskService.reorderTasks(todos)
      res.send({ message: 'Tasks reordered successfully' })
    } catch (error) {
      errorHandler(error, res)
    }
  }
}
