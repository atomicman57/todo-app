import {
  addTodoApi,
  updateTodoApi,
  deleteTodoApi,
  reorderTodosApi,
  getTodosApi,
} from '../../services/todos'
import {
  Todo,
  NewTodo,
  TodoUpdateProps,
  GetTodosResponse,
} from '../../types/todo.type'

const API_BASE_URL = process.env.REACT_APP_BASE_API_URL
const API_URL = `${API_BASE_URL}/tasks`

const mockFetch = jest.fn()
global.fetch = mockFetch as any

const dummyTodo: Todo = {
  id: 1,
  name: 'Test Todo',
  completed: false,
  sort: 0,
}

const dummyNewTodo: NewTodo = {
  name: 'Test Todo',
  completed: false,
  sort: 0,
}

const dummyTodoUpdate: TodoUpdateProps = {
  id: 1,
  name: 'Updated Todo',
}

const dummyGetTodosResponse: GetTodosResponse = {
  todos: [dummyTodo],
}

describe('todos API functions', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('addTodoApi', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ todo: dummyTodo }),
    })

    const result = await addTodoApi(dummyNewTodo)
    expect(mockFetch).toHaveBeenCalledWith(`${API_URL}`, {
      method: 'POST',
      body: JSON.stringify(dummyNewTodo),
      headers: { 'Content-Type': 'application/json' },
    })
    expect(result).toEqual({ todo: dummyTodo })
  })

  it('updateTodoApi', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => dummyTodo,
    })

    const result = await updateTodoApi(dummyTodoUpdate)
    expect(mockFetch).toHaveBeenCalledWith(`${API_URL}/${dummyTodoUpdate.id}`, {
      method: 'PUT',
      body: JSON.stringify(dummyTodoUpdate),
      headers: { 'Content-Type': 'application/json' },
    })
    expect(result).toEqual(dummyTodo)
  })

  it('deleteTodoApi', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => 'Deleted',
    })

    await deleteTodoApi(dummyTodo.id)
    expect(mockFetch).toHaveBeenCalledWith(`${API_URL}/${dummyTodo.id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
  })

  it('reorderTodosApi', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => dummyGetTodosResponse,
    })

    const result = await reorderTodosApi([dummyTodo])
    expect(mockFetch).toHaveBeenCalledWith(API_URL, {
      method: 'PUT',
      body: JSON.stringify({ todos: [dummyTodo] }),
      headers: { 'Content-Type': 'application/json' },
    })
    expect(result).toEqual(dummyGetTodosResponse)
  })

  it('getTodosApi', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => dummyGetTodosResponse,
    })

    const result = await getTodosApi()
    expect(mockFetch).toHaveBeenCalledWith(API_URL, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    expect(result).toEqual(dummyGetTodosResponse)
  })
})
