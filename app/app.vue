<!-- app/app.vue -->
<template>
  <div id="app">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    
    <!-- Global loading indicator -->
    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="pending"
        class="fixed inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50 flex items-center justify-center"
      >
        <div class="text-center">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p class="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    </Transition>

    <!-- Scroll to top button -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="transform translate-y-2 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform translate-y-2 opacity-0"
    >
      <button
        v-if="showScrollTop"
        @click="scrollToTop"
        class="fixed bottom-8 right-8 w-12 h-12 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center z-40"
        aria-label="Scroll to top"
      >
        <UIcon name="i-heroicons-arrow-up" class="h-5 w-5" />
      </button>
    </Transition>
  </div>
</template>

<script setup lang="ts">
// Global app configuration
useHead({
  titleTemplate: (title?: string) => title ? `${title}` : 'Portfolio - Creative Developer',
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'format-detection', content: 'telephone=no' }
  ]
})

// Global state
const pending = ref(false)
const showScrollTop = ref(false)

// Navigation loading state
const router = useRouter()

router.beforeEach(() => {
  pending.value = true
})

router.afterEach(() => {
  pending.value = false
})

// Scroll to top functionality
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

// Show/hide scroll to top button
onMounted(() => {
  const handleScroll = () => {
    showScrollTop.value = window.scrollY > 400
  }

  window.addEventListener('scroll', handleScroll)
  
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })
})

// Global error handling
onErrorCaptured((error) => {
  console.error('Global error:', error)
  return false
})

// Service worker registration
if (process.client && 'serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      await navigator.serviceWorker.register('/sw.js')
      console.log('Service Worker registered')
    } catch (error) {
      console.log('Service Worker registration failed:', error)
    }
  })
}
</script>

<style>
/* Global styles are imported via CSS files */
</style>
