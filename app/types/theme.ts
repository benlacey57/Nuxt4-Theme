// types/theme.ts
export type ColorMode = 'light' | 'dark' | 'system'

export interface ThemeState {
  mode: ColorMode
  preference: ColorMode
  system: ColorMode
}
