<template>
  <UCard
    class="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer overflow-hidden"
    :ui="{
      ring: 'ring-1 ring-gray-200 dark:ring-gray-700 group-hover:ring-primary-500',
      body: { padding: 'p-0' }
    }"
    @click="navigateToProject"
  >
    <!-- Project Image -->
    <div class="relative h-48 overflow-hidden">
      <img
        :src="project.image"
        :alt="project.title"
        class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        @error="handleImageError"
      />
      
      <!-- Status Badge -->
      <div class="absolute top-3 left-3">
        <UBadge
          :label="statusLabel"
          :color="statusColor"
          variant="solid"
          size="xs"
        />
      </div>

      <!-- Featured Badge -->
      <div v-if="project.featured" class="absolute top-3 right-3">
        <UBadge
          label="Featured"
          color="yellow"
          variant="solid"
          size="xs"
        />
      </div>

      <!-- Overlay with quick actions -->
      <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3">
        <UButton
          v-if="project.liveUrl"
          icon="i-heroicons-eye"
          size="sm"
          variant="solid"
          color="white"
          @click.stop="openExternalLink(project.liveUrl!)"
        />
        <UButton
          v-if="project.githubUrl"
          icon="i-simple-icons-github"
          size="sm"
          variant="solid"
          color="white"
          @click.stop="openExternalLink(project.githubUrl!)"
        />
      </div>
    </div>

    <!-- Project Content -->
    <div class="p-6">
      <!-- Category -->
      <div class="flex items-center justify-between mb-2">
        <span class="text-xs font-medium text-primary-600 dark:text-primary-400 uppercase tracking-wide">
          {{ categoryLabel }}
        </span>
        <span class="text-xs text-gray-500 dark:text-gray-400">
          {{ formatDate(project.createdAt) }}
        </span>
      </div>

      <!-- Title -->
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
        {{ project.title }}
      </h3>

      <!-- Description -->
      <p class="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
        {{ project.description }}
      </p>

      <!-- Technologies -->
      <div class="flex flex-wrap gap-1 mb-4">
        <UBadge
          v-for="tech in project.technologies.slice(0, 3)"
          :key="tech"
          :label="tech"
          color="gray"
          variant="soft"
          size="xs"
        />
        <UBadge
          v-if="project.technologies.length > 3"
          :label="`+${project.technologies.length - 3}`"
          color="gray"
          variant="soft"
          size="xs"
        />
      </div>

      <!-- Actions -->
      <div class="flex items-center justify-between">
        <UButton
          label="View Details"
          icon="i-heroicons-arrow-right"
          variant="ghost"
          size="xs"
          class="text-primary-600 dark:text-primary-400"
        />
        
        <div class="flex space-x-2">
          <UButton
            v-if="project.liveUrl"
            icon="i-heroicons-globe-alt"
            size="xs"
            variant="ghost"
            color="gray"
            @click.stop="openExternalLink(project.liveUrl!)"
          />
          <UButton
            v-if="project.githubUrl"
            icon="i-simple-icons-github"
            size="xs"
            variant="ghost"
            color="gray"
            @click.stop="openExternalLink(project.githubUrl!)"
          />
        </div>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import type { Project } from '~/types'

interface Props {
  project: Project
}

const props = defineProps<Props>()

const statusLabel = computed(() => {
  return props.project.status
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
})

const statusColor = computed(() => {
  const colors = {
    'completed': 'green',
    'in-progress': 'blue',
    'planned': 'yellow',
    'archived': 'gray'
  }
  return colors[props.project.status] || 'gray'
})

const categoryLabel = computed(() => {
  return props.project.category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
})

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'short'
  })
}

const navigateToProject = () => {
  navigateTo(`/projects/${props.project.slug}`)
}

const openExternalLink = (url: string) => {
  window.open(url, '_blank', 'noopener,noreferrer')
}

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.src = '/images/placeholder-project.jpg' // Fallback image
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
