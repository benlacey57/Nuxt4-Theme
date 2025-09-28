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
