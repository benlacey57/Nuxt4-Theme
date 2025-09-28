export interface NavigationItem {
  label: string
  to: string
  icon?: string
  children?: NavigationItem[]
  external?: boolean
}

export interface Project {
  id: string
  title: string
  slug: string
  description: string
  longDescription?: string
  image: string
  gallery?: string[]
  technologies: string[]
  category: ProjectCategory
  status: ProjectStatus
  githubUrl?: string
  liveUrl?: string
  featured?: boolean
  createdAt: string
  updatedAt: string
}

export type ProjectCategory = 
  | 'web-development' 
  | 'mobile-app' 
  | 'design' 
  | 'api' 
  | 'other'

export type ProjectStatus = 
  | 'completed' 
  | 'in-progress' 
  | 'planned' 
  | 'archived'

export interface FilterOption {
  label: string
  value: string
  count?: number
}

export interface ProjectFilters {
  category: ProjectCategory | 'all'
  status: ProjectStatus | 'all'
  technology: string | 'all'
  search: string
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
