import type { ColorMode, ThemeState } from '~/types'

export const useTheme = () => {
  const colorMode = useColorMode()
  
  const state = reactive<ThemeState>({
    mode: colorMode.value as ColorMode,
    preference: colorMode.preference as ColorMode,
    system: 'light'
  })

  const toggleTheme = () => {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }

  const setTheme = (mode: ColorMode) => {
    colorMode.preference = mode
  }

  // Watch for system theme changes
  if (process.client) {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    state.system = mediaQuery.matches ? 'dark' : 'light'
    
    mediaQuery.addEventListener('change', (e) => {
      state.system = e.matches ? 'dark' : 'light'
    })
  }

  watch(() => colorMode.value, (newMode) => {
    state.mode = newMode as ColorMode
  }, { immediate: true })

  return {
    ...toRefs(state),
    toggleTheme,
    setTheme,
    isDark: computed(() => colorMode.value === 'dark')
  }
}
