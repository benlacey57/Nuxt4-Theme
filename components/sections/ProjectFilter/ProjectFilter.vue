<template>
  <div class="bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-8">
    <div class="flex flex-col lg:flex-row gap-6 items-start lg:items-end">
      <!-- Search -->
      <div class="w-full lg:flex-1">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Search Projects
        </label>
        <UInput
          v-model="localFilters.search"
          placeholder="Search by title, description, or technology..."
          icon="i-heroicons-magnifying-glass"
          size="md"
          class="w-full"
        />
      </div>

      <!-- Category Filter -->
      <div class="w-full lg:w-48">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Category
        </label>
        <USelect
          v-model="localFilters.category"
          :options="categoryOptions"
          option-attribute="label"
          value-attribute="value"
          size="md"
        />
      </div>

      <!-- Status Filter -->
      <div class="w-full lg:w-48">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Status
        </label>
        <USelect
          v-model="localFilters.status"
          :options="statusOptions"
          option-attribute="label"
          value-attribute="value"
          size="md"
        />
      </div>

      <!-- Technology Filter -->
      <div class="w-full lg:w-48">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Technology
        </label>
        <USelect
          v-model="localFilters.technology"
          :options="technologyOptions"
          option-attribute="label"
          value-attribute="value"
          size="md"
        />
      </div>

      <!-- Reset Button -->
      <div class="w-full lg:w-auto">
        <UButton
          label="Reset"
          icon="i-heroicons-arrow-path"
          variant="outline"
          color="gray"
          size="md"
          @click="handleReset"
          class="w-full lg:w-auto"
        />
      </div>
    </div>

    <!-- Results Summary -->
    <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Showing {{ resultCount }} of {{ totalCount }} projects
        <span v-if="hasActiveFilters" class="text-primary-600 dark:text-primary-400">
          (filtered)
        </span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProjectFilters, FilterOption } from '~/types'

interface Props {
  filters: ProjectFilters
  categoryOptions: FilterOption[]
  statusOptions: FilterOption[]
  technologyOptions: FilterOption[]
  resultCount: number
  totalCount: number
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:filters': [filters: ProjectFilters]
  'reset': []
}>()

// Local reactive copy of filters for immediate UI updates
const localFilters = reactive({ ...props.filters })

// Watch for external filter changes
watch(() => props.filters, (newFilters) => {
  Object.assign(localFilters, newFilters)
}, { deep: true })

// Debounced emit for filter changes
const debouncedEmit = useDebounceFn(() => {
  emit('update:filters', { ...localFilters })
}, 300)

// Watch local filters and emit changes
watch(localFilters, () => {
  debouncedEmit()
}, { deep: true })

const hasActiveFilters = computed(() => {
  return localFilters.search !== '' ||
         localFilters.category !== 'all' ||
         localFilters.status !== 'all' ||
         localFilters.technology !== 'all'
})

const handleReset = () => {
  Object.assign(localFilters, {
    search: '',
    category: 'all',
    status: 'all',
    technology: 'all'
  })
  emit('reset')
}
</script>
