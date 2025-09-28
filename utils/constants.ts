export const SITE_CONFIG = {
  name: 'Portfolio',
  description: 'Creative Developer & Digital Innovator',
  url: 'https://your-domain.com',
  email: 'hello@example.com',
  phone: '+44 (0) 123 456 7890',
  location: 'London, UK',
  social: {
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourusername',
    twitter: 'https://twitter.com/yourusername',
    dribbble: 'https://dribbble.com/yourusername'
  }
} as const

export const PROJECT_CATEGORIES = {
  'web-development': 'Web Development',
  'mobile-app': 'Mobile App',
  'design': 'Design',
  'api': 'API',
  'other': 'Other'
} as const

export const PROJECT_STATUSES = {
  'completed': 'Completed',
  'in-progress': 'In Progress',
  'planned': 'Planned',
  'archived': 'Archived'
} as const

export const SKILLS = {
  frontend: [
    'Vue.js',
    'Nuxt',
    'React',
    'Next.js',
    'TypeScript',
    'Tailwind CSS',
    'HTML5',
    'CSS3',
    'JavaScript'
  ],
  backend: [
    'Node.js',
    'Express',
    'Python',
    'Django',
    'PostgreSQL',
    'MongoDB',
    'Redis',
    'GraphQL',
    'REST APIs'
  ],
  mobile: [
    'React Native',
    'Flutter',
    'Expo',
    'iOS Development',
    'Android Development'
  ],
  tools: [
    'Git',
    'Docker',
    'AWS',
    'Vercel',
    'Netlify',
    'Figma',
    'Adobe Creative Suite',
    'VS Code'
  ]
} as const

export const API_ENDPOINTS = {
  contact: '/api/contact',
  projects: '/api/projects',
  newsletter: '/api/newsletter'
} as const

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
} as const
