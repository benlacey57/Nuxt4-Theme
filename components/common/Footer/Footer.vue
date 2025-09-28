<template>
  <footer class="bg-gray-900 dark:bg-gray-950">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <!-- Main footer content -->
      <div class="py-16">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- Brand section -->
          <div class="lg:col-span-2">
            <div class="flex items-center space-x-2 mb-4">
              <UIcon name="i-heroicons-code-bracket" class="h-8 w-8 text-primary-400" />
              <span class="text-xl font-bold text-white">Portfolio</span>
            </div>
            <p class="text-gray-300 max-w-md mb-6">
              Crafting exceptional digital experiences with modern technologies and innovative solutions.
            </p>
            
            <!-- Social links -->
            <div class="flex space-x-4">
              <UButton
                v-for="social in socialLinks"
                :key="social.name"
                :icon="social.icon"
                color="gray"
                variant="ghost"
                size="sm"
                :aria-label="social.name"
                @click="openExternalLink(social.url)"
                class="hover:text-primary-400 transition-colors duration-200"
              />
            </div>
          </div>

          <!-- Quick links -->
          <div>
            <h3 class="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Quick Links
            </h3>
            <ul class="space-y-3">
              <li v-for="link in quickLinks" :key="link.label">
                <NuxtLink
                  :to="link.to"
                  class="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  {{ link.label }}
                </NuxtLink>
              </li>
            </ul>
          </div>

          <!-- Contact info -->
          <div>
            <h3 class="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Get In Touch
            </h3>
            <div class="space-y-3">
              <div class="flex items-center space-x-3 text-gray-300">
                <UIcon name="i-heroicons-envelope" class="h-5 w-5" />
                <span>hello@example.com</span>
              </div>
              <div class="flex items-center space-x-3 text-gray-300">
                <UIcon name="i-heroicons-phone" class="h-5 w-5" />
                <span>+44 (0) 123 456 7890</span>
              </div>
              <div class="flex items-center space-x-3 text-gray-300">
                <UIcon name="i-heroicons-map-pin" class="h-5 w-5" />
                <span>London, UK</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom section -->
      <div class="border-t border-gray-800 py-6">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <p class="text-gray-400 text-sm">
            © {{ currentYear }} Portfolio. All rights reserved.
          </p>
          <div class="flex space-x-6 mt-4 md:mt-0">
            <NuxtLink
              v-for="legal in legalLinks"
              :key="legal.label"
              :to="legal.to"
              class="text-gray-400 hover:text-white text-sm transition-colors duration-200"
            >
              {{ legal.label }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()

const socialLinks = [
  { name: 'GitHub', icon: 'i-simple-icons-github', url: 'https://github.com' },
  { name: 'LinkedIn', icon: 'i-simple-icons-linkedin', url: 'https://linkedin.com' },
  { name: 'Twitter', icon: 'i-simple-icons-twitter', url: 'https://twitter.com' },
  { name: 'Dribbble', icon: 'i-simple-icons-dribbble', url: 'https://dribbble.com' }
]

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'Projects', to: '/projects' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' }
]

const legalLinks = [
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Terms of Service', to: '/terms' },
  { label: 'Cookie Policy', to: '/cookies' }
]

const openExternalLink = (url: string) => {
  window.open(url, '_blank', 'noopener,noreferrer')
}
</script>
