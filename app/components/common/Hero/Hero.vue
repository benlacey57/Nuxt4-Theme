<template>
  <section 
    class="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-primary-900/20 dark:via-gray-900 dark:to-secondary-900/20 min-h-[80vh] flex items-center"
    :style="backgroundStyles"
  >
    <!-- Background elements -->
    <div class="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-700/25 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]" />
    
    <!-- Animated background shapes -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-32 w-80 h-80 bg-primary-400/20 rounded-full mix-blend-multiply filter blur-xl animate-blob" />
      <div class="absolute -bottom-40 -left-32 w-80 h-80 bg-secondary-400/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
      <div class="absolute top-40 left-40 w-80 h-80 bg-accent-400/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />
    </div>

    <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
      <div class="animate-fade-in">
        <!-- Badge or announcement -->
        <div v-if="badge" class="mb-8 animate-bounce-in">
          <UBadge 
            :label="badge"
            color="primary"
            variant="subtle"
            size="lg"
            class="inline-flex items-center px-4 py-2"
          />
        </div>

        <!-- Main heading -->
        <h1 class="mb-6 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl lg:text-7xl animate-slide-up">
          <span v-html="formattedTitle" />
        </h1>

        <!-- Subtitle -->
        <p 
          v-if="subtitle" 
          class="mb-8 text-xl text-gray-600 dark:text-gray-300 sm:text-2xl animate-slide-up animation-delay-200"
        >
          {{ subtitle }}
        </p>

        <!-- Description -->
        <p 
          v-if="description" 
          class="mx-auto mb-10 max-w-3xl text-lg leading-8 text-gray-600 dark:text-gray-400 animate-slide-up animation-delay-400"
        >
          {{ description }}
        </p>

        <!-- Call-to-action buttons -->
        <div 
          v-if="primaryCta || secondaryCta" 
          class="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up animation-delay-600"
        >
          <UButton
            v-if="primaryCta"
            :label="primaryCta.text"
            :icon="primaryCta.icon"
            size="lg"
            class="w-full sm:w-auto min-w-[200px] hover:scale-105 transition-transform duration-200"
            @click="handleCtaClick(primaryCta)"
          />
          
          <UButton
            v-if="secondaryCta"
            :label="secondaryCta.text"
            :icon="secondaryCta.icon"
            variant="outline"
            size="lg"
            color="gray"
            class="w-full sm:w-auto min-w-[200px] hover:scale-105 transition-transform duration-200"
            @click="handleCtaClick(secondaryCta)"
          />
        </div>

        <!-- Statistics or features -->
        <div 
          v-if="stats?.length" 
          class="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3 animate-slide-up animation-delay-800"
        >
          <div 
            v-for="(stat, index) in stats" 
            :key="index"
            class="text-center"
          >
            <div class="text-3xl font-bold text-primary-600 dark:text-primary-400">
              {{ stat.value }}
            </div>
            <div class="mt-2 text-sm font-medium text-gray-500 dark:text-gray-400">
              {{ stat.label }}
            </div>
          </div>
        </div>

        <!-- Scroll indicator -->
        <div 
          v-if="showScrollIndicator"
          class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
        >
          <UIcon 
            name="i-heroicons-chevron-down" 
            class="h-6 w-6 text-gray-400 dark:text-gray-600"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface CtaButton {
  text: string
  link?: string
  action?: string
  icon?: string
  external?: boolean
}

interface Stat {
  value: string
  label: string
}

interface Props {
  title: string
  subtitle?: string
  description?: string
  badge?: string
  primaryCta?: CtaButton
  secondaryCta?: CtaButton
  backgroundImage?: string
  backgroundVideo?: string
  stats?: Stat[]
  showScrollIndicator?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showScrollIndicator: true
})

const { openModal } = useModal()

// Format title with gradient text
const formattedTitle = computed(() => {
  // Simple gradient text - you can enhance this with more complex formatting
  return props.title.replace(
    /\b(Portfolio|Developer|Creative|Innovative)\b/gi,
    '<span class="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">$1</span>'
  )
})

// Background styles
const backgroundStyles = computed(() => {
  const styles: Record<string, string> = {}
  
  if (props.backgroundImage) {
    styles.backgroundImage = `url(${props.backgroundImage})`
    styles.backgroundSize = 'cover'
    styles.backgroundPosition = 'center'
  }
  
  return styles
})

// Handle CTA clicks
const handleCtaClick = (cta: CtaButton) => {
  if (cta.action) {
    // Handle special actions
    switch (cta.action) {
      case 'contact':
        openModal('contact')
        break
      case 'scroll-to-projects':
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
        break
      default:
        console.warn(`Unknown action: ${cta.action}`)
    }
  } else if (cta.link) {
    // Handle navigation
    if (cta.external) {
      window.open(cta.link, '_blank', 'noopener,noreferrer')
    } else {
      navigateTo(cta.link)
    }
  }
}
</script>

<style scoped>
@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

.animation-delay-200 {
  animation-delay: 0.2s;
}

.animation-delay-400 {
  animation-delay: 0.4s;
}

.animation-delay-600 {
  animation-delay: 0.6s;
}

.animation-delay-800 {
  animation-delay: 0.8s;
}

.bg-grid-slate-100 {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(15 23 42 / 0.04)'%3e%3cpath d='m0 .5h32v32'/%3e%3c/svg%3e");
}

.bg-grid-slate-700\/25 {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(51 65 85 / 0.25)'%3e%3cpath d='m0 .5h32v32'/%3e%3c/svg%3e");
}
</style>
