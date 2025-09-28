<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full text-center">
      <!-- Error Icon -->
      <div class="mb-8">
        <UIcon 
          :name="errorIcon" 
          class="mx-auto h-24 w-24 text-gray-400 dark:text-gray-600"
        />
      </div>

      <!-- Error Code -->
      <h1 class="text-6xl font-bold text-gray-900 dark:text-white mb-4">
        {{ error.statusCode }}
      </h1>

      <!-- Error Message -->
      <h2 class="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
        {{ errorTitle }}
      </h2>

      <p class="text-gray-600 dark:text-gray-400 mb-8">
        {{ errorDescription }}
      </p>

      <!-- Action Buttons -->
      <div class="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
        <UButton
          label="Go Home"
          icon="i-heroicons-home"
          size="lg"
          @click="navigateTo('/')"
        />
        
        <UButton
          v-if="error.statusCode !== 404"
          label="Try Again"
          icon="i-heroicons-arrow-path"
          variant="outline"
          size="lg"
          @click="handleError"
        />
        
        <UButton
          v-if="error.statusCode === 404"
          label="View Projects"
          icon="i-heroicons-folder-open"
          variant="outline"
          size="lg"
          @click="navigateTo('/projects')"
        />
      </div>

      <!-- Additional Help -->
      <div class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Need help? Contact support
        </p>
        <UButton
          label="Contact Support"
          icon="i-heroicons-envelope"
          variant="ghost"
          size="sm"
          @click="openModal('contact')"
        />
      </div>
    </div>

    <!-- Background decoration -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-40 -right-32 w-80 h-80 bg-primary-400/10 rounded-full mix-blend-multiply filter blur-xl" />
      <div class="absolute -bottom-40 -left-32 w-80 h-80 bg-secondary-400/10 rounded-full mix-blend-multiply filter blur-xl" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface ErrorProps {
  error: {
    statusCode: number
    statusMessage?: string
    stack?: string
    data?: any
  }
}

const props = defineProps<ErrorProps>()
const { openModal } = useModal()

// Error details based on status code
const errorDetails = computed(() => {
  const details = {
    404: {
      title: 'Page Not Found',
      description: 'The page you\'re looking for doesn\'t exist or has been moved.',
      icon: 'i-heroicons-document-magnifying-glass'
    },
    500: {
      title: 'Server Error',
      description: 'Something went wrong on our end. Please try again later.',
      icon: 'i-heroicons-exclamation-triangle'
    },
    403: {
      title: 'Access Forbidden',
      description: 'You don\'t have permission to access this resource.',
      icon: 'i-heroicons-shield-exclamation'
    },
    default: {
      title: 'Something Went Wrong',
      description: 'An unexpected error occurred. Please try again.',
      icon: 'i-heroicons-exclamation-circle'
    }
  }

  return details[props.error.statusCode as keyof typeof details] || details.default
})

const errorTitle = computed(() => errorDetails.value.title)
const errorDescription = computed(() => errorDetails.value.description)
const errorIcon = computed(() => errorDetails.value.icon)

// Handle error retry
const handleError = async () => {
  try {
    await clearError({ redirect: '/' })
  } catch (error) {
    console.error('Error handling failed:', error)
    await navigateTo('/')
  }
}

// SEO
useHead({
  title: `${props.error.statusCode} - ${errorTitle.value}`,
  meta: [
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})

// Log error for debugging
if (process.client) {
  console.error('Error page rendered:', props.error)
}
</script>
