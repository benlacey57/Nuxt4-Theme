<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
    <CommonHeader />
    
    <main class="relative">
      <slot />
    </main>
    
    <CommonFooter />
    
    <!-- Global modals -->
    <CommonModal 
      v-model="isContactModalOpen" 
      title="Get In Touch"
      size="lg"
    >
      <ContactForm @close="closeModal('contact')" />
    </CommonModal>
  </div>
</template>

<script setup lang="ts">
const { isModalOpen, closeModal } = useModal()
const isContactModalOpen = isModalOpen('contact')

// SEO
useHead({
  htmlAttrs: {
    lang: 'en-GB'
  }
})
</script>
