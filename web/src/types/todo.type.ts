import { InputProps } from '@chakra-ui/react'

export type GetTodosResponse = {
  todos: Todo[]
}

export type Todo = {
  id: number
  name: string
  completed: boolean
  sort: number
}

export type NewTodo = {
  id?: number
  name: string
  completed: boolean
  sort: number
}

export type TodoUpdateProps = {
  id: number
  name?: string
  completed?: boolean
  sort?: number
}

export interface TodoItemProps {
  bg: string
  id: number
  name: string
  completed: boolean
  onButtonClick: (id: number, completed: boolean) => void
  onDelete: (id: number) => void
  onEdit: (id: number) => void
}

export interface TodoEditModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (newValue: string) => void
  defaultValue: string
}

export interface TodoInputProps extends InputProps {
  name: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onButtonClick: () => void
  onEnterPress: () => void
}
