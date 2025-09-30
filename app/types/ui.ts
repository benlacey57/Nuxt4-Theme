// types/ui.ts
export interface ModalProps {
  modelValue: boolean
  title?: string
  description?: string
  persistent?: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  loading?: boolean
  disabled?: boolean
  icon?: string
  iconPosition?: 'left' | 'right'
}

export interface CardProps {
  title?: string
  description?: string
  image?: string
  badge?: string
  actions?: boolean
  hoverable?: boolean
}

export interface HeroProps {
  title: string
  subtitle?: string
  description?: string
  ctaText?: string
  ctaLink?: string
  backgroundImage?: string
  backgroundVideo?: string
}
