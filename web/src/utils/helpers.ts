import { extendTheme } from '@chakra-ui/react'
import { ItemStyleProps, AppTheme } from '../types/theme.type'

const appTheme: AppTheme = {
  fonts: {
    heading: 'Josefin Sans, sans-serif',
    body: 'Josefin Sans, sans-serif',
  },
  colors: {
    darkBg: '#161722',
    darkContainer: '#25273c',
    darkTodoText: '#cacde8',
    darkTodoHeader: '#ffff',
    darkCompletedTodo: '#777a92',
    darkDivider: '#393a4c',
    blueFilter: '#3a7bfd',
  },
}

export const theme: AppTheme = extendTheme(appTheme)

export function reorder<T extends { sort?: number }>(
  list: T[],
  startIndex: number,
  endIndex: number,
): T[] {
  const result: T[] = Array.from(list)
  const [removed]: T[] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  result.forEach((item, index) => {
    item.sort = index
  })

  return result
}

export function getItemStyle(
  draggableStyle: ItemStyleProps,
): React.CSSProperties {
  return {
    ...draggableStyle,
    userSelect: 'none',
    width: '540px',
  }
}

export const themeColors = {
  darkBg: 'darkBg',
  darkContainer: 'darkContainer',
  darkTodoText: 'darkTodoText',
  darkTodoHeader: 'darkTodoHeader',
  darkCompletedTodo: 'darkCompletedTodo',
  darkDivider: 'darkDivider',
  blueFilter: 'blueFilter',
}
