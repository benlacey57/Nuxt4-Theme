<template>
  <UModal 
    v-model="internalValue"
    :ui="{
      overlay: { background: 'bg-gray-200/50 dark:bg-gray-800/50' },
      background: 'bg-white dark:bg-gray-900',
      ring: 'ring-1 ring-gray-200 dark:ring-gray-700',
      width: modalWidthClasses,
      height: size === 'full' ? 'h-screen' : ''
    }"
    :prevent-close="persistent"
  >
    <UCard
      :ui="{
        ring: '',
        divide: 'divide-y divide-gray-200 dark:divide-gray-700',
        header: { padding: 'px-6 py-4' },
        body: { padding: size === 'full' ? 'p-0' : 'px-6 py-4' },
        footer: { padding: 'px-6 py-4' }
      }"
    >
      <!-- Header -->
      <template #header>
        <div class="flex items-center justify-between">
          <div>
            <h3 
              v-if="title" 
              class="text-lg font-semibold leading-6 text-gray-900 dark:text-white"
            >
              {{ title }}
            </h3>
            <p 
              v-if="description" 
              class="mt-1 text-sm text-gray-500 dark:text-gray-400"
            >
              {{ description }}
            </p>
          </div>
          
          <UButton
            v-if="!persistent"
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="close"
          />
        </div>
      </template>

      <!-- Body -->
      <template #body>
        <slot />
      </template>

      <!-- Footer -->
      <template v-if="$slots.footer" #footer>
        <slot name="footer" />
      </template>
    </UCard>
  </UModal>
</template>

<script setup lang="ts">
import type { ModalProps } from '~/types'

interface Props extends ModalProps {}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  persistent: false
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const internalValue = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit('update:modelValue', value)
})

const modalWidthClasses = computed(() => {
  const sizeClasses = {
    sm: 'sm:max-w-sm',
    md: 'sm:max-w-md',
    lg: 'sm:max-w-lg',
    xl: 'sm:max-w-xl',
    full: 'w-screen'
  }
  return sizeClasses[props.size]
})

const close = () => {
  internalValue.value = false
}

// Provide close function to child components
provide('closeModal', close)
</script>
