<template>
  <div>
    <!-- Loading State -->
    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <USkeleton
        v-for="i in 6"
        :key="i"
        class="h-80 w-full"
        :ui="{ rounded: 'rounded-lg' }"
      />
    </div>

    <!-- Empty State -->
    <div 
      v-else-if="projects.length === 0"
      class="text-center py-16"
    >
      <UIcon name="i-heroicons-folder-open" class="mx-auto h-12 w-12 text-gray-400 mb-4" />
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
        No projects found
      </h3>
      <p class="text-gray-500 dark:text-gray-400 mb-6">
        Try adjusting your filters or search terms.
      </p>
      <UButton
        label="Reset Filters"
        variant="outline"
        @click="$emit('reset-filters')"
      />
    </div>

    <!-- Projects Grid -->
    <div 
      v-else
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <div
        v-for="(project, index) in projects"
        :key="project.id"
        class="animate-fade-in"
        :style="{ animationDelay: `${index * 100}ms` }"
      >
        <ProjectCard :project="project" />
      </div>
    </div>

    <!-- Load More Button -->
    <div v-if="showLoadMore" class="text-center mt-12">
      <UButton
        label="Load More Projects"
        icon="i-heroicons-arrow-down"
        variant="outline"
        size="lg"
        :loading="loadingMore"
        @click="$emit('load-more')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Project } from '~/types'

interface Props {
  projects: Project[]
  loading?: boolean
  loadingMore?: boolean
  showLoadMore?: boolean
}

withDefaults(defineProps<Props>(), {
  loading: false,
  loadingMore: false,
  showLoadMore: false
})

defineEmits<{
  'reset-filters': []
  'load-more': []
}>()
</script>
