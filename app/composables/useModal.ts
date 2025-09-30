export const useModal = () => {
  const modals = ref<Record<string, boolean>>({})

  const openModal = (name: string) => {
    modals.value[name] = true
  }

  const closeModal = (name: string) => {
    modals.value[name] = false
  }

  const toggleModal = (name: string) => {
    modals.value[name] = !modals.value[name]
  }

  const isModalOpen = (name: string) => {
    return computed(() => !!modals.value[name])
  }

  const closeAllModals = () => {
    Object.keys(modals.value).forEach(name => {
      modals.value[name] = false
    })
  }

  // Close modals on escape key
  if (process.client) {
    onMounted(() => {
      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          closeAllModals()
        }
      }
      
      document.addEventListener('keydown', handleEscape)
      
      onUnmounted(() => {
        document.removeEventListener('keydown', handleEscape)
      })
    })
  }

  return {
    modals: readonly(modals),
    openModal,
    closeModal,
    toggleModal,
    isModalOpen,
    closeAllModals
  }
}
