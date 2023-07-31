import {
  Todo,
  NewTodo,
  TodoUpdateProps,
  GetTodosResponse,
} from '../types/todo.type'

const API_BASE_URL = process.env.REACT_APP_BASE_API_URL

const API_URL = `${API_BASE_URL}/tasks`

const defaultHeaders = { 'Content-Type': 'application/json' }

const request = async <T>(url: string, options: RequestInit): Promise<T> => {
  const response = await fetch(url, {
    ...options,
    headers: { ...defaultHeaders, ...options.headers },
  })

  if (!response.ok) {
    throw new Error(`Error ${options.method} todo: ${response.statusText}`)
  }

  return await response.json()
}

export const addTodoApi = async (todo: NewTodo): Promise<{ todo: Todo }> => {
  return request<{ todo: Todo }>(API_URL, {
    method: 'POST',
    body: JSON.stringify(todo),
  })
}

export const updateTodoApi = async (todo: TodoUpdateProps): Promise<Todo> => {
  return request<Todo>(`${API_URL}/${todo.id}`, {
    method: 'PUT',
    body: JSON.stringify(todo),
  })
}

export const deleteTodoApi = async (id: number): Promise<void> => {
  await request<void>(`${API_URL}/${id}`, {
    method: 'DELETE',
  })
}

export const reorderTodosApi = async (
  todos: Todo[],
): Promise<GetTodosResponse> => {
  return request<GetTodosResponse>(API_URL, {
    method: 'PUT',
    body: JSON.stringify({ todos }),
  })
}

export const getTodosApi = async (): Promise<GetTodosResponse> => {
  return request<GetTodosResponse>(API_URL, {
    method: 'GET',
  })
}
