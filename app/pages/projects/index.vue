<template>
  <div>
    <!-- Page Header -->
    <div class="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 py-16">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            My Projects
          </h1>
          <p class="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A collection of projects I've worked on, showcasing different technologies and approaches to solving real-world problems.
          </p>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <!-- Filters -->
      <ProjectFilter
        :filters="filters"
        :category-options="categoryOptions"
        :status-options="statusOptions"
        :technology-options="technologyOptions"
        :result-count="resultCount"
        :total-count="projects.length"
        @update:filters="updateFilter"
        @reset="resetFilters"
      />

      <!-- Project List -->
      <ProjectList
        :projects="filteredProjects"
        :loading="loading"
        @reset-filters="resetFilters"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
// SEO
useHead({
  title: 'Projects - Portfolio',
  meta: [
    { name: 'description', content: 'Browse through my portfolio of web development, mobile app, and API projects.' }
  ]
})

// Composables
const { projects, loading, fetchProjects } = useProjects()
const { 
  filters, 
  filteredProjects, 
  categoryOptions, 
  statusOptions, 
  technologyOptions,
  resetFilters,
  updateFilter,
  resultCount
} = useFilters(projects)

// Apply URL query parameters to filters
const route = useRoute()
watch(() => route.query, (query) => {
  if (query.category && typeof query.category === 'string') {
    updateFilter('category', query.category as any)
  }
  if (query.status && typeof query.status === 'string') {
    updateFilter('status', query.status as any)
  }
  if (query.search && typeof query.search === 'string') {
    updateFilter('search', query.search)
  }
}, { immediate: true })

// Update URL when filters change
watch(filters, (newFilters) => {
  const query: Record<string, string> = {}
  
  if (newFilters.category !== 'all') query.category = newFilters.category
  if (newFilters.status !== 'all') query.status = newFilters.status
  if (newFilters.search) query.search = newFilters.search
  
  navigateTo({ 
    path: '/projects', 
    query: Object.keys(query).length ? query : undefined 
  }, { replace: true })
}, { deep: true })

// Fetch projects on mount
onMounted(() => {
  fetchProjects()
})
</script>
