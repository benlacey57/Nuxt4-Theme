export interface NavigationItem {
  label: string
  to: string
  icon?: string
  children?: NavigationItem[]
  external?: boolean
}

// types/theme.ts
export type ColorMode = 'light' | 'dark' | 'system'

export interface ThemeState {
  mode: ColorMode
  preference: ColorMode
  system: ColorMode
}

// Utility types for better type safety
export type RequiredField<T, K extends keyof T> = T & Required<Pick<T, K>>

export type PartialExcept<T, K extends keyof T> = Partial<T> & Pick<T, K>

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

