import type { ProjectFilters, FilterOption, Project } from '~/types'

export const useFilters = (projects: Ref<Project[]>) => {
  const filters = ref<ProjectFilters>({
    category: 'all',
    status: 'all',
    technology: 'all',
    search: ''
  })

  const filteredProjects = computed(() => {
    let result = projects.value

    // Filter by category
    if (filters.value.category !== 'all') {
      result = result.filter(project => project.category === filters.value.category)
    }

    // Filter by status
    if (filters.value.status !== 'all') {
      result = result.filter(project => project.status === filters.value.status)
    }

    // Filter by technology
    if (filters.value.technology !== 'all') {
      result = result.filter(project => 
        project.technologies.some(tech => 
          tech.toLowerCase().includes(filters.value.technology.toLowerCase())
        )
      )
    }

    // Filter by search
    if (filters.value.search) {
      const searchTerm = filters.value.search.toLowerCase()
      result = result.filter(project =>
        project.title.toLowerCase().includes(searchTerm) ||
        project.description.toLowerCase().includes(searchTerm) ||
        project.technologies.some(tech => tech.toLowerCase().includes(searchTerm))
      )
    }

    return result
  })

  const categoryOptions = computed<FilterOption[]>(() => {
    const categories = [...new Set(projects.value.map(p => p.category))]
    return [
      { label: 'All Categories', value: 'all' },
      ...categories.map(cat => ({
        label: cat.split('-').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' '),
        value: cat,
        count: projects.value.filter(p => p.category === cat).length
      }))
    ]
  })

  const statusOptions = computed<FilterOption[]>(() => {
    const statuses = [...new Set(projects.value.map(p => p.status))]
    return [
      { label: 'All Statuses', value: 'all' },
      ...statuses.map(status => ({
        label: status.split('-').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' '),
        value: status,
        count: projects.value.filter(p => p.status === status).length
      }))
    ]
  })

  const technologyOptions = computed<FilterOption[]>(() => {
    const techs = [...new Set(projects.value.flatMap(p => p.technologies))]
    return [
      { label: 'All Technologies', value: 'all' },
      ...techs.map(tech => ({
        label: tech,
        value: tech,
        count: projects.value.filter(p => p.technologies.includes(tech)).length
      }))
    ]
  })

  const resetFilters = () => {
    filters.value = {
      category: 'all',
      status: 'all',
      technology: 'all',
      search: ''
    }
  }

  const updateFilter = <K extends keyof ProjectFilters>(
    key: K, 
    value: ProjectFilters[K]
  ) => {
    filters.value[key] = value
  }

  return {
    filters,
    filteredProjects,
    categoryOptions,
    statusOptions,
    technologyOptions,
    resetFilters,
    updateFilter,
    resultCount: computed(() => filteredProjects.value.length)
  }
    }
