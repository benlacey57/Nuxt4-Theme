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
