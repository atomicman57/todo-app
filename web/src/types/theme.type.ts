import { ThemeConfig } from '@chakra-ui/react'
import { DraggingStyle, NotDraggingStyle } from 'react-beautiful-dnd'

export interface ThemeColors {
  darkBg: string
  darkContainer: string
  darkTodoText: string
  darkCompletedTodo: string
  darkTodoHeader: string
  darkDivider: string
  blueFilter: string
}

export interface ThemeFonts {
  heading: string
  body: string
}

export interface AppTheme extends ThemeConfig {
  colors?: ThemeColors
  fonts?: ThemeFonts
}

export type ItemStyleProps = DraggingStyle | NotDraggingStyle | undefined
