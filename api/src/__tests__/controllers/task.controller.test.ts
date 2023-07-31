import request from 'supertest'
import express, { Express } from 'express'
import taskRoutes from '../../routes/task.routes'
import knex from 'knex'
import TaskRepo from '../../models/task.model'
import { Task } from '../../types/task.type'

let app: Express
let taskRepo: TaskRepo

const db = knex({
  client: 'sqlite3',
  connection: ':memory:',
  useNullAsDefault: true,
})

beforeAll(async () => {
  // Create the tasks table
  await db.schema.createTable('tasks', (table) => {
    table.increments('id').primary()
    table.string('name').notNullable()
    table.boolean('completed').defaultTo(false)
    table.integer('sort').notNullable()
  })

  taskRepo = new TaskRepo(db)

  // Initialize Express app
  app = express()
  app.use(express.json())
  app.use('/tasks', taskRoutes({ taskRepo }))
})

beforeEach(async () => {
  // Clear tasks table before each test
  await db.schema.dropTableIfExists('tasks')
  await db.schema.createTable('tasks', (table) => {
    table.increments('id').primary()
    table.string('name').notNullable()
    table.boolean('completed').defaultTo(false)
    table.integer('sort').notNullable()
  })
})

describe('Task Controller', () => {
  test('GET /tasks should return an empty list initially', async () => {
    const res = await request(app).get('/tasks')
    expect(res.status).toBe(200)
    expect(res.body.todos).toEqual([])
  })

  test('POST /tasks should create a new task', async () => {
    const newTask = {
      name: 'Test Task',
      completed: 0,
      sort: 1,
    }

    const res = await request(app).post('/tasks').send(newTask)
    expect(res.status).toBe(201)
    expect(res.body.todo).toMatchObject(newTask)
  })

  test('DELETE /tasks/:id should delete a task', async () => {
    // Create a task
    const newTask: Task = {
      name: 'Test Task',
      completed: false,
      sort: 1,
    }
    const createdTask = await taskRepo.create(newTask)

    // Delete the task
    const res = await request(app).delete(`/tasks/${createdTask.id}`)
    expect(res.status).toBe(200)
    expect(res.body.message).toBe(`Task with id ${createdTask.id} deleted`)
  })

  test('PUT /tasks should reorder the tasks', async () => {
    // Create some tasks
    const task1 = await taskRepo.create({
      name: 'Task 1',
      completed: false,
      sort: 1,
    })
    const task2 = await taskRepo.create({
      name: 'Task 2',
      completed: false,
      sort: 2,
    })
    const task3 = await taskRepo.create({
      name: 'Task 3',
      completed: false,
      sort: 3,
    })

    // Reorder the tasks
    const reorderedTasks = [task1, task2, task3]
    const res = await request(app).put('/tasks').send({ todos: reorderedTasks })
    expect(res.status).toBe(200)
    expect(res.body.message).toBe('Tasks reordered successfully')

    // Ensure the tasks have been reordered
    const retrievedTasks = await taskRepo.find()
    expect(retrievedTasks).toEqual(reorderedTasks)
  })

  test('POST /tasks should return a 400 error if name is missing', async () => {
    const newTask = {
      completed: false,
      sort: 1,
    }
    const res = await request(app).post('/tasks').send(newTask)
    expect(res.status).toBe(400)
    expect(res.body.message).toBe('Task name cannot be empty or whitespace')
  })
  test('PUT /tasks/:id should return a 400 error if ID is invalid', async () => {
    const updatedTask = {
      name: 'Updated Task',
      completed: true,
      sort: 2,
    }
    const res = await request(app).put('/tasks/invalid-id').send(updatedTask)
    expect(res.status).toBe(400)
    expect(res.body.message).toBe('Invalid task ID')
  })

  test('PUT /tasks/:id should return a 404 error if task is not found', async () => {
    const updatedTask = {
      id: 999,
      name: 'Updated Task',
      completed: true,
      sort: 2,
    }
    const res = await request(app).put('/tasks/999').send(updatedTask)
    expect(res.status).toBe(404)
    expect(res.body.message).toBe('Task with id 999 not found')
  })

  test('DELETE /tasks/:id should return a 400 error if ID is invalid', async () => {
    const res = await request(app).delete('/tasks/invalid-id')
    expect(res.status).toBe(400)
    expect(res.body.message).toBe('Invalid task ID')
  })

  test('DELETE /tasks/:id should return a 404 error if task is not found', async () => {
    const res = await request(app).delete('/tasks/999')
    expect(res.status).toBe(404)
    expect(res.body.message).toBe('Task with id 999 not found')
  })

  test('PUT /tasks should return a 400 error if todos list is invalid', async () => {
    const res = await request(app).put('/tasks').send({ todos: {} })
    expect(res.status).toBe(400)
    expect(res.body.message).toBe('Invalid tasks list')
  })
})
