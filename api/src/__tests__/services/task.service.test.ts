// __tests__/task.service.test.ts
import { Task } from '../../types/task.type'
import { TaskService } from '../../services/task.service'
import TaskRepo from '../../models/task.model'
import { ValidationError, NotFoundError } from '../../utils/errors'

describe('Task Service', () => {
  let taskRepo: TaskRepo
  let taskService: TaskService
  let tasks: Task[]

  beforeEach(() => {
    tasks = [
      { id: 1, name: 'Task 1', completed: false, sort: 1 },
      { id: 2, name: 'Task 2', completed: true, sort: 2 },
    ] as Task[]

    taskRepo = new TaskRepo(null as any)
    taskService = new TaskService(taskRepo)

    jest.spyOn(taskRepo, 'find').mockResolvedValue(tasks)
    jest
      .spyOn(taskRepo, 'findById')
      .mockImplementation(
        async (id) => tasks.find((task) => task.id === id) || null,
      )
    jest
      .spyOn(taskRepo, 'create')
      .mockImplementation(async (task) => ({ ...task, id: tasks.length + 1 }))
    jest.spyOn(taskRepo, 'update').mockImplementation(async (id, task) => {
      const updatedTask = tasks.find((t) => t.id === id)
      if (updatedTask) {
        Object.assign(updatedTask, task)
      }
      return 1
    })
    jest.spyOn(taskRepo, 'delete').mockResolvedValue(1)
    jest.spyOn(taskRepo, 'reorderTasks').mockResolvedValue(undefined)
  })

  test('findAll', async () => {
    const result = await taskService.findAll()
    expect(result).toEqual(tasks)
  })

  test('create', async () => {
    const newTask: Task = { name: 'New Task', completed: false, sort: 3 }
    const result = await taskService.create(newTask)
    expect(result).toMatchObject({ ...newTask, id: 3 })
  })

  test('create with empty name', async () => {
    const newTask: Task = { name: '', completed: false, sort: 3 }
    await expect(taskService.create(newTask)).rejects.toThrow(ValidationError)
  })

  test('update', async () => {
    const updatedTask: Partial<Task> = { name: 'Updated Task', completed: true }
    const result = await taskService.update(1, updatedTask)
    expect(result).toBe(1)
    expect(tasks[0]).toMatchObject({ ...tasks[0], ...updatedTask })
  })

  test('update with non-existent ID', async () => {
    await expect(
      taskService.update(99, { name: 'Updated Task' }),
    ).rejects.toThrow(NotFoundError)
  })

  test('update with empty name', async () => {
    await expect(taskService.update(1, { name: ' ' })).rejects.toThrow(
      ValidationError,
    )
  })

  test('delete', async () => {
    const result = await taskService.delete(1)
    expect(result).toBe(1)
  })

  test('delete with non-existent ID', async () => {
    await expect(taskService.delete(99)).rejects.toThrow(NotFoundError)
  })

  test('reorderTasks', async () => {
    const reorderedTasks: Task[] = [
      { id: 1, name: 'Task 1', completed: false, sort: 2 },
      { id: 2, name: 'Task2', completed: true, sort: 1 },
    ]

    await taskService.reorderTasks(reorderedTasks)
    expect(taskRepo.reorderTasks).toHaveBeenCalledWith(reorderedTasks)
  })

  test('reorderTasks with empty array', async () => {
    await expect(taskService.reorderTasks([])).rejects.toThrow(ValidationError)
  })

  test('reorderTasks with invalid input', async () => {
    await expect(taskService.reorderTasks({} as any)).rejects.toThrow(
      ValidationError,
    )
  })
})
