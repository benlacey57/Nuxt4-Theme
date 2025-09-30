import type { Project, ProjectFilters, ProjectCategory, ProjectStatus } from '~/types'

export const useProjects = () => {
  const projects = ref<Project[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Mock data - replace with actual API calls
  const mockProjects: Project[] = [
    {
      id: '1',
      title: 'E-commerce Platform',
      slug: 'ecommerce-platform',
      description: 'Modern e-commerce solution with advanced features',
      longDescription: 'A comprehensive e-commerce platform built with modern technologies including real-time inventory, payment processing, and analytics dashboard.',
      image: '/images/projects/ecommerce.jpg',
      gallery: ['/images/projects/ecommerce-1.jpg', '/images/projects/ecommerce-2.jpg'],
      technologies: ['Vue.js', 'Nuxt', 'Node.js', 'MongoDB', 'Stripe'],
      category: 'web-development',
      status: 'completed',
      githubUrl: 'https://github.com/example/ecommerce',
      liveUrl: 'https://example-ecommerce.com',
      featured: true,
      createdAt: '2024-01-15',
      updatedAt: '2024-03-20'
    },
    {
      id: '2',
      title: 'Mobile Banking App',
      slug: 'mobile-banking-app',
      description: 'Secure mobile banking application',
      longDescription: 'A secure and user-friendly mobile banking application with biometric authentication, real-time transactions, and comprehensive financial management tools.',
      image: '/images/projects/banking.jpg',
      technologies: ['React Native', 'TypeScript', 'Node.js', 'PostgreSQL'],
      category: 'mobile-app',
      status: 'completed',
      featured: true,
      createdAt: '2024-02-10',
      updatedAt: '2024-04-15'
    },
    {
      id: '3',
      title: 'Task Management API',
      slug: 'task-management-api',
      description: 'RESTful API for task management',
      longDescription: 'A robust RESTful API for task management with user authentication, real-time updates, and comprehensive project organisation features.',
      image: '/images/projects/api.jpg',
      technologies: ['Node.js', 'Express', 'MongoDB', 'Socket.io'],
      category: 'api',
      status: 'in-progress',
      githubUrl: 'https://github.com/example/task-api',
      createdAt: '2024-03-01',
      updatedAt: '2024-09-15'
    }
  ]

  const fetchProjects = async () => {
    loading.value = true
    error.value = null
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      projects.value = mockProjects
    } catch (err) {
      error.value = 'Failed to fetch projects'
      console.error('Error fetching projects:', err)
    } finally {
      loading.value = false
    }
  }

  const getProjectBySlug = (slug: string): Project | undefined => {
    return projects.value.find(project => project.slug === slug)
  }

  const getFeaturedProjects = (): Project[] => {
    return projects.value.filter(project => project.featured)
  }

  const getProjectsByCategory = (category: ProjectCategory): Project[] => {
    return projects.value.filter(project => project.category === category)
  }

  const getProjectsByStatus = (status: ProjectStatus): Project[] => {
    return projects.value.filter(project => project.status === status)
  }

  return {
    projects: readonly(projects),
    loading: readonly(loading),
    error: readonly(error),
    fetchProjects,
    getProjectBySlug,
    getFeaturedProjects,
    getProjectsByCategory,
    getProjectsByStatus
  }
}
