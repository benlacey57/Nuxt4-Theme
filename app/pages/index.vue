<template>
  <div>
    <!-- Hero Section -->
    <CommonHero
      title="Creative Developer & Digital Innovator"
      subtitle="Building exceptional digital experiences"
      description="I craft modern, performant web applications and mobile solutions using cutting-edge technologies and best practices."
      badge="Available for new projects"
      :primary-cta="{
        text: 'View My Work',
        action: 'scroll-to-projects',
        icon: 'i-heroicons-arrow-down'
      }"
      :secondary-cta="{
        text: 'Get In Touch',
        action: 'contact',
        icon: 'i-heroicons-envelope'
      }"
      :stats="[
        { value: '50+', label: 'Projects Completed' },
        { value: '3+', label: 'Years Experience' },
        { value: '100%', label: 'Client Satisfaction' }
      ]"
    />

    <!-- Featured Projects Section -->
    <section id="projects" class="py-24 bg-white dark:bg-gray-900">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Featured Projects
          </h2>
          <p class="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A showcase of my recent work, demonstrating expertise across different technologies and domains.
          </p>
        </div>

        <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <USkeleton
            v-for="i in 3"
            :key="i"
            class="h-80 w-full"
            :ui="{ rounded: 'rounded-lg' }"
          />
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div
            v-for="(project, index) in featuredProjects"
            :key="project.id"
            class="animate-slide-up"
            :style="{ animationDelay: `${index * 200}ms` }"
          >
            <ProjectCard :project="project" />
          </div>
        </div>

        <div class="text-center">
          <UButton
            label="View All Projects"
            icon="i-heroicons-arrow-right"
            size="lg"
            variant="outline"
            @click="navigateTo('/projects')"
          />
        </div>
      </div>
    </section>

    <!-- Skills & Technologies Section -->
    <section class="py-24 bg-gray-50 dark:bg-gray-800">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Skills & Technologies
          </h2>
          <p class="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A comprehensive toolkit for building modern digital solutions.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div
            v-for="(category, index) in skillCategories"
            :key="category.title"
            class="animate-slide-up"
            :style="{ animationDelay: `${index * 100}ms` }"
          >
            <UCard class="h-full hover:shadow-lg transition-shadow duration-300">
              <div class="text-center">
                <div class="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UIcon :name="category.icon" class="h-6 w-6 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {{ category.title }}
                </h3>
                <div class="space-y-2">
                  <UBadge
                    v-for="skill in category.skills"
                    :key="skill"
                    :label="skill"
                    color="gray"
                    variant="soft"
                    size="sm"
                    class="mr-1 mb-1"
                  />
                </div>
              </div>
            </UCard>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-24 bg-primary-600 dark:bg-primary-900">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Ready to start your next project?
        </h2>
        <p class="mt-4 text-lg text-primary-100 max-w-2xl mx-auto">
          Let's work together to bring your ideas to life with modern technology and thoughtful design.
        </p>
        <div class="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <UButton
            label="Start a Project"
            icon="i-heroicons-rocket-launch"
            size="lg"
            color="white"
            @click="openModal('contact')"
          />
          <UButton
            label="View My CV"
            icon="i-heroicons-document-text"
            variant="outline"
            size="lg"
            color="white"
            @click="openExternalLink('/cv.pdf')"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// SEO
useHead({
  title: 'Portfolio - Creative Developer & Digital Innovator',
  meta: [
    { name: 'description', content: 'Professional portfolio showcasing modern web development, mobile applications, and digital solutions.' }
  ]
})

// Composables
const { projects, loading, fetchProjects, getFeaturedProjects } = useProjects()
const { openModal } = useModal()

// Featured projects
const featuredProjects = computed(() => getFeaturedProjects())

// Skills data
const skillCategories = [
  {
    title: 'Frontend',
    icon: 'i-heroicons-device-phone-mobile',
    skills: ['Vue.js', 'Nuxt', 'React', 'TypeScript', 'Tailwind CSS']
  },
  {
    title: 'Backend',
    icon: 'i-heroicons-server',
    skills: ['Node.js', 'Express', 'Python', 'PostgreSQL', 'MongoDB']
  },
  {
    title: 'Mobile',
    icon: 'i-heroicons-device-tablet',
    skills: ['React Native', 'Flutter', 'iOS', 'Android', 'Expo']
  },
  {
    title: 'Tools',
    icon: 'i-heroicons-wrench-screwdriver',
    skills: ['Git', 'Docker', 'AWS', 'Vercel', 'Figma']
  }
]

// Methods
const openExternalLink = (url: string) => {
  window.open(url, '_blank', 'noopener,noreferrer')
}

// Load projects on mount
onMounted(() => {
  fetchProjects()
})
</script>
