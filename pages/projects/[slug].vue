<template>
  <div v-if="project">
    <!-- Hero Section -->
    <div class="relative bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 py-24">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <!-- Project Info -->
          <div class="animate-slide-up">
            <!-- Breadcrumb -->
            <nav class="mb-6">
              <ol class="flex items-center space-x-2 text-sm">
                <li>
                  <NuxtLink to="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                    Home
                  </NuxtLink>
                </li>
                <UIcon name="i-heroicons-chevron-right" class="h-4 w-4 text-gray-400" />
                <li>
                  <NuxtLink to="/projects" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                    Projects
                  </NuxtLink>
                </li>
                <UIcon name="i-heroicons-chevron-right" class="h-4 w-4 text-gray-400" />
                <li class="text-gray-900 dark:text-white font-medium">{{ project.title }}</li>
              </ol>
            </nav>

            <!-- Status and Category -->
            <div class="flex items-center space-x-3 mb-4">
              <UBadge
                :label="statusLabel"
                :color="statusColor"
                variant="solid"
              />
              <UBadge
                :label="categoryLabel"
                color="gray"
                variant="soft"
              />
              <UBadge
                v-if="project.featured"
                label="Featured"
                color="yellow"
                variant="solid"
              />
            </div>

            <!-- Title and Description -->
            <h1 class="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl mb-6">
              {{ project.title }}
            </h1>
            
            <p class="text-xl text-gray-600 dark:text-gray-400 mb-8">
              {{ project.longDescription || project.description }}
            </p>

            <!-- Action Buttons -->
            <div class="flex flex-col sm:flex-row gap-4">
              <UButton
                v-if="project.liveUrl"
                label="View Live Site"
                icon="i-heroicons-globe-alt"
                size="lg"
                @click="openExternalLink(project.liveUrl!)"
              />
              <UButton
                v-if="project.githubUrl"
                label="View Source"
                icon="i-simple-icons-github"
                variant="outline"
                size="lg"
                @click="openExternalLink(project.githubUrl!)"
              />
            </div>
          </div>

          <!-- Project Image -->
          <div class="animate-slide-up animation-delay-200">
            <div class="relative group">
              <img
                :src="project.image"
                :alt="project.title"
                class="w-full h-auto rounded-lg shadow-2xl transition-transform duration-300 group-hover:scale-105"
                @error="handleImageError"
              />
              
              <!-- Image Overlay -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <!-- Main Content -->
        <div class="lg:col-span-2">
          <!-- Project Gallery -->
          <div v-if="project.gallery?.length" class="mb-12">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Gallery</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                v-for="(image, index) in project.gallery"
                :key="index"
                class="group cursor-pointer"
                @click="openImageModal(image)"
              >
                <img
                  :src="image"
                  :alt="`${project.title} screenshot ${index + 1}`"
                  class="w-full h-64 object-cover rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </div>
          </div>

          <!-- Project Details -->
          <div class="mb-12">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Project Details</h2>
            <div class="prose prose-gray dark:prose-invert max-w-none">
              <p>{{ project.longDescription || project.description }}</p>
              
              <!-- Add more detailed description here -->
              <p>
                This project demonstrates modern web development practices and showcases
                various technologies working together to create a seamless user experience.
                The implementation focuses on performance, accessibility, and maintainability.
              </p>
              
              <h3>Key Features</h3>
              <ul>
                <li>Responsive design that works on all devices</li>
                <li>Modern UI/UX with smooth animations</li>
                <li>Optimised performance and loading times</li>
                <li>Accessibility-first approach</li>
                <li>SEO optimised for search engines</li>
              </ul>
            </div>
          </div>

          <!-- Technologies Used -->
          <div class="mb-12">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Technologies Used</h2>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <div
                v-for="tech in project.technologies"
                :key="tech"
                class="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <div class="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                  <UIcon name="i-heroicons-code-bracket" class="h-4 w-4 text-primary-600 dark:text-primary-400" />
                </div>
                <span class="text-sm font-medium text-gray-900 dark:text-white">{{ tech }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="lg:col-span-1">
          <div class="sticky top-8 space-y-8">
            <!-- Project Info Card -->
            <UCard>
              <template #header>
                <h3 class="text-lg font-semibold">Project Information</h3>
              </template>

              <div class="space-y-4">
                <div>
                  <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Status</dt>
                  <dd class="mt-1">
                    <UBadge :label="statusLabel" :color="statusColor" variant="soft" />
                  </dd>
                </div>

                <div>
                  <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Category</dt>
                  <dd class="mt-1 text-sm text-gray-900 dark:text-white">{{ categoryLabel }}</dd>
                </div>

                <div>
                  <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Created</dt>
                  <dd class="mt-1 text-sm text-gray-900 dark:text-white">{{ formatDate(project.createdAt) }}</dd>
                </div>

                <div>
                  <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Last Updated</dt>
                  <dd class="mt-1 text-sm text-gray-900 dark:text-white">{{ formatDate(project.updatedAt) }}</dd>
                </div>

                <div v-if="project.liveUrl || project.githubUrl" class="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div class="space-y-3">
                    <UButton
                      v-if="project.liveUrl"
                      label="View Live Site"
                      icon="i-heroicons-globe-alt"
                      block
                      @click="openExternalLink(project.liveUrl!)"
                    />
                    <UButton
                      v-if="project.githubUrl"
                      label="View Source Code"
                      icon="i-simple-icons-github"
                      variant="outline"
                      block
                      @click="openExternalLink(project.githubUrl!)"
                    />
                  </div>
                </div>
              </div>
            </UCard>

            <!-- Related Projects -->
            <UCard>
              <template #header>
                <h3 class="text-lg font-semibold">Related Projects</h3>
              </template>

              <div class="space-y-4">
                <div
                  v-for="relatedProject in relatedProjects"
                  :key="relatedProject.id"
                  class="group cursor-pointer"
                  @click="navigateTo(`/projects/${relatedProject.slug}`)"
                >
                  <div class="flex space-x-3">
                    <img
                      :src="relatedProject.image"
                      :alt="relatedProject.title"
                      class="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                    />
                    <div class="flex-1 min-w-0">
                      <h4 class="text-sm font-medium text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
                        {{ relatedProject.title }}
                      </h4>
                      <p class="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                        {{ relatedProject.description }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </UCard>
          </div>
        </div>
      </div>
    </div>

    <!-- Image Modal -->
    <CommonModal v-model="imageModalOpen" size="xl">
      <div class="text-center">
        <img
          v-if="selectedImage"
          :src="selectedImage"
          :alt="project.title"
          class="w-full h-auto max-h-[80vh] object-contain rounded-lg"
        />
      </div>
    </CommonModal>
  </div>

  <!-- Loading State -->
  <div v-else-if="pending" class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
      <p class="text-gray-600 dark:text-gray-400">Loading project...</p>
    </div>
  </div>

  <!-- Error State -->
  <div v-else class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <UIcon name="i-heroicons-exclamation-triangle" class="mx-auto h-12 w-12 text-gray-400 mb-4" />
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Project Not Found</h1>
      <p class="text-gray-600 dark:text-gray-400 mb-6">
        The project you're looking for doesn't exist or has been moved.
      </p>
      <UButton
        label="Back to Projects"
        icon="i-heroicons-arrow-left"
        @click="navigateTo('/projects')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
// Get route parameter
const route = useRoute()
const slug = route.params.slug as string

// Composables
const { projects, fetchProjects, getProjectBySlug } = useProjects()

// Load projects if not already loaded
const { pending } = await useAsyncData('projects', () => fetchProjects())

// Get current project
const project = computed(() => getProjectBySlug(slug))

// Related projects (same category, excluding current)
const relatedProjects = computed(() => {
  if (!project.value) return []
  
  return projects.value
    .filter(p => p.category === project.value!.category && p.id !== project.value!.id)
    .slice(0, 3)
})

// Image modal
const imageModalOpen = ref(false)
const selectedImage = ref<string | null>(null)

// Computed properties
const statusLabel = computed(() => {
  if (!project.value) return ''
  return project.value.status
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
})

const statusColor = computed(() => {
  if (!project.value) return 'gray'
  const colors = {
    'completed': 'green',
    'in-progress': 'blue',
    'planned': 'yellow',
    'archived': 'gray'
  }
  return colors[project.value.status] || 'gray'
})

const categoryLabel = computed(() => {
  if (!project.value) return ''
  return project.value.category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
})

// Methods
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const openExternalLink = (url: string) => {
  window.open(url, '_blank', 'noopener,noreferrer')
}

const openImageModal = (image: string) => {
  selectedImage.value = image
  imageModalOpen.value = true
}

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.src = '/images/placeholder-project.jpg'
}

// SEO
useHead(() => ({
  title: project.value ? `${project.value.title} - Portfolio` : 'Project - Portfolio',
  meta: [
    { 
      name: 'description', 
      content: project.value?.description || 'Project details and information'
    }
  ]
}))

// Handle 404
if (!pending.value && !project.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Project Not Found'
  })
}
</script>
