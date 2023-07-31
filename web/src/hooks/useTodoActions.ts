import { useMutation, useQuery } from 'react-query'
import {
  addTodoApi,
  updateTodoApi,
  deleteTodoApi,
  reorderTodosApi,
  getTodosApi,
} from '../services/todos'
import useErrorToast from './useErrorToast'

const useTodoActions = () => {
  const showErrorToast = useErrorToast()

  const { data: todos, isLoading } = useQuery('tasks', getTodosApi, {
    onError: (error: Error) => {
      showErrorToast(error.message)
    },
    select: (response) => response.todos,
  })

  const addTodoMutation = useMutation(addTodoApi, {
    onError: (error: Error) => {
      showErrorToast(error.message)
    },
  })

  const updateTodoMutation = useMutation(updateTodoApi, {
    onError: (error: Error) => {
      showErrorToast(error.message)
    },
  })

  const deleteTodoMutation = useMutation(deleteTodoApi, {
    onError: (error: Error) => {
      showErrorToast(error.message)
    },
  })

  const reorderTodoMutation = useMutation(reorderTodosApi, {
    onError: (error: Error) => {
      showErrorToast(error.message)
    },
  })

  return {
    todos,
    isLoading,
    addTodoMutation,
    updateTodoMutation,
    deleteTodoMutation,
    reorderTodoMutation,
  }
}

export default useTodoActions
