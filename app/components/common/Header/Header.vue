<template>
  <header 
    class="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 transition-all duration-300"
    :class="{ 'shadow-lg': scrolled }"
  >
    <nav class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <!-- Logo -->
        <div class="flex items-center">
          <NuxtLink 
            to="/" 
            class="flex items-center space-x-2 text-xl font-bold text-gray-900 dark:text-white transition-colors duration-200 hover:text-primary-600 dark:hover:text-primary-400"
          >
            <UIcon name="i-heroicons-code-bracket" class="h-8 w-8" />
            <span>Portfolio</span>
          </NuxtLink>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:block">
          <div class="ml-10 flex items-baseline space-x-4">
            <template v-for="item in navigation" :key="item.label">
              <!-- Simple link -->
              <NuxtLink 
                v-if="!item.children"
                :to="item.to"
                :external="item.external"
                class="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
                active-class="text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20"
              >
                <UIcon v-if="item.icon" :name="item.icon" class="mr-1" />
                {{ item.label }}
              </NuxtLink>

              <!-- Mega menu dropdown -->
              <UDropdown v-else :items="[item.children]" :popper="{ placement: 'bottom-start' }">
                <UButton 
                  variant="ghost" 
                  :icon="item.icon"
                  trailing-icon="i-heroicons-chevron-down-20-solid"
                  class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  {{ item.label }}
                </UButton>

                <template #item="{ item: subItem }">
                  <NuxtLink 
                    :to="subItem.to"
                    class="group flex items-center gap-2 w-full px-2 py-1.5 text-sm text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-all duration-200"
                  >
                    <UIcon v-if="subItem.icon" :name="subItem.icon" class="h-4 w-4" />
                    <div>
                      <div class="font-medium">{{ subItem.label }}</div>
                      <div v-if="subItem.description" class="text-xs text-gray-500 dark:text-gray-400">
                        {{ subItem.description }}
                      </div>
                    </div>
                  </NuxtLink>
                </template>
              </UDropdown>
            </template>
          </div>
        </div>

        <!-- Right side actions -->
        <div class="flex items-center space-x-4">
          <!-- Theme toggle -->
          <UButton
            :icon="isDark ? 'i-heroicons-sun' : 'i-heroicons-moon'"
            size="sm"
            color="gray"
            variant="ghost"
            :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
            @click="toggleTheme"
            class="hidden sm:flex"
          />

          <!-- CTA Button -->
          <UButton
            label="Contact"
            icon="i-heroicons-envelope"
            size="sm"
            class="hidden sm:flex animate-pulse hover:animate-none"
            @click="openModal('contact')"
          />

          <!-- Mobile menu button -->
          <UButton
            :icon="mobileMenuOpen ? 'i-heroicons-x-mark' : 'i-heroicons-bars-3'"
            size="sm"
            color="gray"
            variant="ghost"
            class="md:hidden"
            @click="toggleMobileMenu"
            :aria-label="mobileMenuOpen ? 'Close menu' : 'Open menu'"
          />
        </div>
      </div>

      <!-- Mobile Navigation -->
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <div v-if="mobileMenuOpen" class="md:hidden">
          <div class="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
            <template v-for="item in navigation" :key="item.label">
              <!-- Simple mobile link -->
              <NuxtLink
                v-if="!item.children"
                :to="item.to"
                :external="item.external"
                class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
                active-class="text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20"
                @click="closeMobileMenu"
              >
                <UIcon v-if="item.icon" :name="item.icon" class="mr-2" />
                {{ item.label }}
              </NuxtLink>

              <!-- Mobile submenu -->
              <div v-else>
                <button
                  class="w-full flex items-center justify-between px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
                  @click="toggleSubmenu(item.label)"
                >
                  <span class="flex items-center">
                    <UIcon v-if="item.icon" :name="item.icon" class="mr-2" />
                    {{ item.label }}
                  </span>
                  <UIcon 
                    name="i-heroicons-chevron-down" 
                    class="h-4 w-4 transition-transform duration-200"
                    :class="{ 'rotate-180': openSubmenus.includes(item.label) }"
                  />
                </button>
                
                <Transition
                  enter-active-class="transition duration-200 ease-out"
                  enter-from-class="transform opacity-0 max-h-0"
                  enter-to-class="transform opacity-100 max-h-96"
                  leave-active-class="transition duration-150 ease-in"
                  leave-from-class="transform opacity-100 max-h-96"
                  leave-to-class="transform opacity-0 max-h-0"
                >
                  <div 
                    v-if="openSubmenus.includes(item.label)" 
                    class="ml-4 mt-1 space-y-1 overflow-hidden"
                  >
                    <NuxtLink
                      v-for="subItem in item.children"
                      :key="subItem.label"
                      :to="subItem.to"
                      class="block px-3 py-2 rounded-md text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
                      @click="closeMobileMenu"
                    >
                      <UIcon v-if="subItem.icon" :name="subItem.icon" class="mr-2 h-4 w-4" />
                      {{ subItem.label }}
                    </NuxtLink>
                  </div>
                </Transition>
              </div>
            </template>

            <!-- Mobile actions -->
            <div class="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
              <UButton
                :icon="isDark ? 'i-heroicons-sun' : 'i-heroicons-moon'"
                :label="isDark ? 'Light Mode' : 'Dark Mode'"
                variant="ghost"
                class="w-full justify-start mb-2"
                @click="toggleTheme"
              />
              <UButton
                label="Contact"
                icon="i-heroicons-envelope"
                class="w-full"
                @click="() => { openModal('contact'); closeMobileMenu(); }"
              />
            </div>
          </div>
        </div>
      </Transition>
    </nav>
  </header>
</template>

<script setup lang="ts">
import type { NavigationItem } from '~/types'

const { isDark, toggleTheme } = useTheme()
const { openModal } = useModal()

// Mobile menu state
const mobileMenuOpen = ref(false)
const openSubmenus = ref<string[]>([])

// Scroll detection
const scrolled = ref(false)

// Navigation items
const navigation: NavigationItem[] = [
  {
    label: 'Home',
    to: '/',
    icon: 'i-heroicons-home'
  },
  {
    label: 'Projects',
    to: '/projects',
    icon: 'i-heroicons-folder-open',
    children: [
      {
        label: 'All Projects',
        to: '/projects',
        icon: 'i-heroicons-rectangle-stack',
        description: 'View all projects'
      },
      {
        label: 'Web Development',
        to: '/projects?category=web-development',
        icon: 'i-heroicons-globe-alt',
        description: 'Web applications and sites'
      },
      {
        label: 'Mobile Apps',
        to: '/projects?category=mobile-app',
        icon: 'i-heroicons-device-phone-mobile',
        description: 'iOS and Android applications'
      },
      {
        label: 'APIs',
        to: '/projects?category=api',
        icon: 'i-heroicons-server',
        description: 'Backend services and APIs'
      }
    ]
  },
  {
    label: 'About',
    to: '/about',
    icon: 'i-heroicons-user'
  },
  {
    label: 'Contact',
    to: '/contact',
    icon: 'i-heroicons-envelope'
  }
]

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
  if (!mobileMenuOpen.value) {
    openSubmenus.value = []
  }
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
  openSubmenus.value = []
}

const toggleSubmenu = (label: string) => {
  const index = openSubmenus.value.indexOf(label)
  if (index > -1) {
    openSubmenus.value.splice(index, 1)
  } else {
    openSubmenus.value.push(label)
  }
}

// Handle scroll
onMounted(() => {
  const handleScroll = () => {
    scrolled.value = window.scrollY > 10
  }
  
  window.addEventListener('scroll', handleScroll)
  
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })
})

// Close mobile menu on route change
watch(() => useRoute().path, () => {
  closeMobileMenu()
})
</script>
