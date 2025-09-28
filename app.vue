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

<!-- error.vue -->
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



<!-- assets/css/main.css -->
<style>
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
@import './components.css';
@import './utilities.css';

/* Base styles */
html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
}

/* Focus styles for accessibility */
*:focus-visible {
  @apply outline-2 outline-offset-2 outline-primary-600;
}

/* Selection styles */
::selection {
  @apply bg-primary-600 text-white;
}

/* Scrollbar styles */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  @apply bg-gray-100 dark:bg-gray-800;
}

::-webkit-scrollbar-thumb {
  @apply bg-gray-400 dark:bg-gray-600 rounded-full;
}

::-webkit-scrollbar-thumb:hover {
  @apply bg-gray-500 dark:bg-gray-500;
}

/* Custom animations */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes bounceIn {
  0% {
    transform: scale(0.3);
    opacity: 0;
  }
  50% {
    transform: scale(1.05);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

.animate-slide-up {
  animation: slideUp 0.6s ease-out;
}

.animate-bounce-in {
  animation: bounceIn 0.8s ease-out;
}

/* Responsive typography */
@screen sm {
  html {
    font-size: 14px;
  }
}

@screen md {
  html {
    font-size: 16px;
  }
}

/* Print styles */
@media print {
  .no-print {
    display: none !important;
  }
}
</style>

<!-- assets/css/components.css -->
<style>
/* Custom component styles */

/* Card hover effects */
.card-hover {
  @apply transition-all duration-300 ease-out;
}

.card-hover:hover {
  @apply transform -translate-y-1 shadow-xl;
}

/* Button variants */
.btn-gradient {
  @apply bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700;
}

/* Navigation active states */
.nav-link {
  @apply relative text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200;
}

.nav-link.router-link-active {
  @apply text-primary-600 dark:text-primary-400;
}

.nav-link.router-link-active::after {
  content: '';
  @apply absolute bottom-0 left-0 w-full h-0.5 bg-primary-600 dark:bg-primary-400;
}

/* Modal animations */
.modal-enter-active,
.modal-leave-active {
  @apply transition-all duration-300 ease-out;
}

.modal-enter-from,
.modal-leave-to {
  @apply opacity-0 transform scale-95;
}

/* Loading states */
.skeleton {
  @apply animate-pulse bg-gray-200 dark:bg-gray-700 rounded;
}

/* Form styles */
.form-group {
  @apply space-y-2;
}

.form-label {
  @apply block text-sm font-medium text-gray-700 dark:text-gray-300;
}

.form-input {
  @apply w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm 
         focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
         dark:bg-gray-800 dark:text-white;
}

.form-input:invalid {
  @apply border-red-500 focus:ring-red-500 focus:border-red-500;
}

/* Progress bars */
.progress-bar {
  @apply w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden;
}

.progress-fill {
  @apply h-full bg-primary-600 transition-all duration-500 ease-out;
}

/* Badges */
.badge {
  @apply inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium;
}

.badge-primary {
  @apply bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200;
}

.badge-success {
  @apply bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200;
}

.badge-warning {
  @apply bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200;
}

.badge-error {
  @apply bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200;
}

/* Timeline */
.timeline-item {
  @apply relative pl-8 pb-8;
}

.timeline-item::before {
  content: '';
  @apply absolute left-0 top-2 w-2 h-2 bg-primary-600 rounded-full;
}

.timeline-item::after {
  content: '';
  @apply absolute left-0.5 top-4 w-px h-full bg-gray-200 dark:bg-gray-700;
}

.timeline-item:last-child::after {
  @apply hidden;
}

/* Code blocks */
pre {
  @apply bg-gray-100 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto;
}

code {
  @apply bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm;
}

/* Tables */
.table {
  @apply min-w-full divide-y divide-gray-200 dark:divide-gray-700;
}

.table th {
  @apply px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider;
}

.table td {
  @apply px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white;
}

/* Utility animations */
.fade-in-up {
  @apply transform translate-y-4 opacity-0 transition-all duration-500 ease-out;
}

.fade-in-up.in-view {
  @apply translate-y-0 opacity-100;
}

/* Dark mode transitions */
* {
  @apply transition-colors duration-200;
}
</style>

<!-- assets/css/utilities.css -->
<style>
/* Custom utility classes */

/* Spacing utilities */
.container-padding {
  @apply px-4 sm:px-6 lg:px-8;
}

.section-padding {
  @apply py-16 sm:py-20 lg:py-24;
}

/* Text utilities */
.text-gradient {
  @apply bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent;
}

.text-balance {
  text-wrap: balance;
}

/* Layout utilities */
.aspect-square {
  aspect-ratio: 1 / 1;
}

.aspect-video {
  aspect-ratio: 16 / 9;
}

/* Flexbox utilities */
.flex-center {
  @apply flex items-center justify-center;
}

.flex-between {
  @apply flex items-center justify-between;
}

/* Grid utilities */
.grid-auto-fit {
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}

.grid-auto-fill {
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
}

/* Border utilities */
.border-gradient {
  border-image: linear-gradient(45deg, theme('colors.primary.600'), theme('colors.secondary.600')) 1;
}

/* Background utilities */
.bg-pattern {
  background-image: 
    radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0);
  background-size: 20px 20px;
}

.bg-mesh {
  background-image: 
    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px);
  background-size: 20px 20px;
}

/* Shadow utilities */
.shadow-glow {
  box-shadow: 0 0 20px rgba(var(--primary-rgb), 0.3);
}

.shadow-inner-lg {
  box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.1);
}

/* Transform utilities */
.transform-gpu {
  transform: translate3d(0, 0, 0);
}

/* Scroll utilities */
.scroll-smooth {
  scroll-behavior: smooth;
}

.scroll-snap-x {
  scroll-snap-type: x mandatory;
}

.scroll-snap-y {
  scroll-snap-type: y mandatory;
}

.scroll-snap-start {
  scroll-snap-align: start;
}

.scroll-snap-center {
  scroll-snap-align: center;
}

/* Accessibility utilities */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.focus-ring {
  @apply focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2;
}

/* Print utilities */
@media print {
  .print-hidden {
    display: none !important;
  }
  
  .print-visible {
    display: block !important;
  }
}

/* Motion preferences */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* High contrast mode */
@media (prefers-contrast: high) {
  .text-gradient {
    @apply text-gray-900 dark:text-white bg-none;
  }
}

/* Container queries */
@container (min-width: 768px) {
  .container-md\:grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

/* Custom scrollbar track */
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: theme('colors.gray.400') theme('colors.gray.100');
}

.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  @apply bg-gray-100 dark:bg-gray-800 rounded-full;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  @apply bg-gray-400 dark:bg-gray-600 rounded-full;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  @apply bg-gray-500 dark:bg-gray-500;
}

/* Loading spinner */
.spinner {
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Glassmorphism effect */
.glass {
  @apply bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-white/20 dark:border-gray-700/20;
}

.glass-strong {
  @apply bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border border-white/30 dark:border-gray-700/30;
}
</style>

