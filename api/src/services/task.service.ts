import { Task } from '../types/task.type'
import TaskRepo from '../models/task.model'
import { NotFoundError, ValidationError } from '../utils/errors'
import { isNullOrWhitespace } from '../utils/validation'

export class TaskService {
  private taskRepo: TaskRepo

  constructor(taskRepo: TaskRepo) {
    this.taskRepo = taskRepo
  }

  findAll() {
    return this.taskRepo.find()
  }

  async create(task: Task) {
    if (isNullOrWhitespace(task.name)) {
      throw new ValidationError('Task name cannot be empty or whitespace')
    }

    return this.taskRepo.create(task)
  }

  async update(id: number, task: Partial<Task>) {
    if (task.name && isNullOrWhitespace(task.name)) {
      throw new ValidationError('Task name cannot be empty or whitespace')
    }
    if (isNaN(id) || id <= 0) {
      throw new ValidationError('Invalid task ID')
    }

    const existingTask = await this.taskRepo.findById(id)
    if (!existingTask) {
      throw new NotFoundError(`Task with id ${id} not found`)
    }

    return this.taskRepo.update(id, task)
  }

  async delete(id: number) {
    if (isNaN(id) || id <= 0) {
      throw new ValidationError('Invalid task ID')
    }

    const existingTask = await this.taskRepo.findById(id)
    if (!existingTask) {
      throw new NotFoundError(`Task with id ${id} not found`)
    }

    return this.taskRepo.delete(id)
  }

  async reorderTasks(tasks: Task[]) {
    if (!Array.isArray(tasks) || tasks.length === 0) {
      throw new ValidationError('Invalid tasks list')
    }

    return this.taskRepo.reorderTasks(tasks)
  }
}
