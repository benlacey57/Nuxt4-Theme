<!-- pages/about.vue -->
<template>
  <div>
    <!-- Hero Section -->
    <CommonHero
      title="About Me"
      subtitle="Developer, Designer & Problem Solver"
      description="Passionate about creating exceptional digital experiences that combine beautiful design with robust functionality. Let me share my journey and what drives me to build better software."
      badge="Open to opportunities"
      :primary-cta="{
        text: 'Download CV',
        link: '/cv.pdf',
        icon: 'i-heroicons-document-arrow-down',
        external: true
      }"
      :secondary-cta="{
        text: 'Get In Touch',
        action: 'contact',
        icon: 'i-heroicons-envelope'
      }"
      :stats="[
        { value: '5+', label: 'Years Coding' },
        { value: '50+', label: 'Projects Built' },
        { value: '15+', label: 'Technologies Mastered' }
      ]"
    />

    <!-- Main Content with Sidebar -->
    <section class="py-16 bg-white dark:bg-gray-900">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <!-- Main Content (2/3 width) -->
          <div class="lg:col-span-2 space-y-12">
            
            <!-- Personal Story -->
            <article class="prose prose-lg dark:prose-invert max-w-none">
              <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                My Story
              </h2>
              <div class="space-y-4 text-gray-600 dark:text-gray-400">
                <p>
                  My journey into software development began during my university years, where I discovered 
                  the perfect intersection of creativity and logical problem-solving. What started as curiosity 
                  about how websites worked quickly evolved into a deep passion for building digital solutions 
                  that make a real difference in people's lives.
                </p>
                <p>
                  Over the past five years, I've had the privilege of working with diverse clients ranging 
                  from innovative startups to established enterprises. Each project has taught me invaluable 
                  lessons about not just writing code, but understanding user needs, collaborating with teams, 
                  and delivering solutions that exceed expectations.
                </p>
                <p>
                  I believe that great software is more than just functional – it should be intuitive, 
                  accessible, and delightful to use. This philosophy guides every project I undertake, 
                  whether it's a complex web application or a simple landing page. I'm constantly learning 
                  and exploring new technologies to stay at the forefront of web development.
                </p>
                <p>
                  When I'm not coding, you'll find me contributing to open-source projects, writing technical 
                  articles to share knowledge with the community, or exploring the latest developments in web 
                  technologies. I'm passionate about mentoring aspiring developers and believe in giving back 
                  to the community that has taught me so much.
                </p>
              </div>
            </article>

            <!-- Core Values -->
            <div>
              <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Core Values
              </h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div
                  v-for="(value, index) in coreValues"
                  :key="value.title"
                  class="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 animate-slide-up"
                  :style="{ animationDelay: `${index * 100}ms` }"
                >
                  <div class="flex items-start space-x-4">
                    <div class="flex-shrink-0">
                      <div class="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                        <UIcon :name="value.icon" class="h-6 w-6 text-primary-600 dark:text-primary-400" />
                      </div>
                    </div>
                    <div>
                      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {{ value.title }}
                      </h3>
                      <p class="text-gray-600 dark:text-gray-400 text-sm">
                        {{ value.description }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Professional Journey -->
            <div>
              <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                Professional Journey
              </h2>
              <div class="relative">
                <!-- Timeline line -->
                <div class="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
                
                <div class="space-y-8">
                  <div
                    v-for="(experience, index) in experiences"
                    :key="index"
                    class="relative pl-12 animate-slide-up"
                    :style="{ animationDelay: `${index * 150}ms` }"
                  >
                    <!-- Timeline dot -->
                    <div class="absolute left-0 top-0 w-8 h-8 bg-primary-600 dark:bg-primary-500 rounded-full border-4 border-white dark:border-gray-900 flex items-center justify-center">
                      <UIcon :name="experience.icon" class="h-4 w-4 text-white" />
                    </div>
                    
                    <!-- Content -->
                    <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-300">
                      <div class="flex items-start justify-between mb-2">
                        <div>
                          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                            {{ experience.title }}
                          </h3>
                          <p class="text-primary-600 dark:text-primary-400 font-medium">
                            {{ experience.company }}
                          </p>
                        </div>
                        <span class="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                          {{ experience.period }}
                        </span>
                      </div>
                      <p class="text-gray-600 dark:text-gray-400 mb-4">
                        {{ experience.description }}
                      </p>
                      <div class="flex flex-wrap gap-2">
                        <UBadge
                          v-for="tech in experience.technologies"
                          :key="tech"
                          :label="tech"
                          color="primary"
                          variant="soft"
                          size="xs"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Skills Breakdown -->
            <div>
              <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                Technical Expertise
              </h2>
              <div class="space-y-6">
                <div
                  v-for="(skillCategory, index) in technicalSkills"
                  :key="skillCategory.category"
                  class="animate-slide-up"
                  :style="{ animationDelay: `${index * 100}ms` }"
                >
                  <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                    <div class="flex items-center mb-4">
                      <div class="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mr-3">
                        <UIcon :name="skillCategory.icon" class="h-5 w-5 text-primary-600 dark:text-primary-400" />
                      </div>
                      <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                        {{ skillCategory.category }}
                      </h3>
                    </div>
                    <div class="space-y-4">
                      <div
                        v-for="skill in skillCategory.skills"
                        :key="skill.name"
                      >
                        <div class="flex items-center justify-between mb-2">
                          <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {{ skill.name }}
                          </span>
                          <span class="text-xs text-gray-500 dark:text-gray-400">
                            {{ skill.level }}%
                          </span>
                        </div>
                        <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            class="bg-primary-600 dark:bg-primary-500 h-2 rounded-full transition-all duration-1000 ease-out"
                            :style="{ width: `${skill.level}%` }"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Education & Certifications -->
            <div>
              <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Education & Certifications
              </h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div
                  v-for="(item, index) in educationItems"
                  :key="index"
                  class="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-lg p-6 hover:shadow-lg transition-all duration-300 animate-slide-up"
                  :style="{ animationDelay: `${index * 100}ms` }"
                >
                  <div class="flex items-start space-x-3 mb-3">
                    <div class="flex-shrink-0 w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                      <UIcon :name="item.icon" class="h-5 w-5 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div class="flex-1">
                      <h3 class="font-semibold text-gray-900 dark:text-white mb-1">
                        {{ item.title }}
                      </h3>
                      <p class="text-sm text-primary-600 dark:text-primary-400 mb-1">
                        {{ item.institution }}
                      </p>
                      <p class="text-xs text-gray-500 dark:text-gray-400">
                        {{ item.year }}
                      </p>
                    </div>
                  </div>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    {{ item.description }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Interests & Hobbies -->
            <div>
              <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Beyond Coding
              </h2>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div
                  v-for="(interest, index) in interests"
                  :key="interest.title"
                  class="text-center group animate-fade-in"
                  :style="{ animationDelay: `${index * 100}ms` }"
                >
                  <div class="w-16 h-16 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900 dark:to-secondary-900 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                    <UIcon :name="interest.icon" class="h-8 w-8 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                    {{ interest.title }}
                  </h3>
                  <p class="text-xs text-gray-600 dark:text-gray-400">
                    {{ interest.subtitle }}
                  </p>
                </div>
              </div>
            </div>

          </div>

          <!-- Sidebar (1/3 width) -->
          <aside class="lg:col-span-1 space-y-6">
            
            <!-- Quick Facts Widget -->
            <div class="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-800 dark:to-gray-700 rounded-lg p-6 shadow-sm sticky top-8">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <UIcon name="i-heroicons-information-circle" class="h-5 w-5 mr-2 text-primary-600 dark:text-primary-400" />
                Quick Facts
              </h3>
              <div class="space-y-4">
                <div
                  v-for="fact in quickFacts"
                  :key="fact.label"
                  class="flex items-start space-x-3"
                >
                  <UIcon :name="fact.icon" class="h-5 w-5 text-primary-600 dark:text-primary-400 mt-0.5 flex-shrink-0" />
                  <div class="flex-1">
                    <p class="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                      {{ fact.label }}
                    </p>
                    <p class="text-sm font-medium text-gray-900 dark:text-white">
                      {{ fact.value }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Availability Status Widget -->
            <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Availability
              </h3>
              <div class="flex items-start space-x-3">
                <div class="flex-shrink-0">
                  <div class="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-900 dark:text-white mb-1">
                    Available for Projects
                  </p>
                  <p class="text-xs text-gray-600 dark:text-gray-400">
                    Accepting new projects starting Q1 2025
                  </p>
                </div>
              </div>
              <UButton
                label="Schedule a Call"
                icon="i-heroicons-calendar"
                block
                size="sm"
                class="mt-4"
                @click="openModal('contact')"
              />
            </div>

            <!-- Contact Info Widget -->
            <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Get In Touch
              </h3>
              <div class="space-y-3">
                <a
                  v-for="contact in contactInfo"
                  :key="contact.label"
                  :href="contact.href"
                  class="flex items-center space-x-3 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                >
                  <UIcon :name="contact.icon" class="h-5 w-5 flex-shrink-0" />
                  <span class="text-sm">{{ contact.label }}</span>
                </a>
              </div>
            </div>

            <!-- Social Links Widget -->
            <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Connect With Me
              </h3>
              <div class="grid grid-cols-2 gap-3">
                <UButton
                  v-for="social in socialLinks"
                  :key="social.name"
                  :icon="social.icon"
                  variant="outline"
                  size="sm"
                  block
                  @click="openExternalLink(social.url)"
                >
                  {{ social.name }}
                </UButton>
              </div>
            </div>

            <!-- Download CV Widget -->
            <div class="bg-gradient-to-br from-primary-600 to-secondary-600 rounded-lg p-6 shadow-lg text-white">
              <h3 class="text-lg font-semibold mb-2">
                Download My CV
              </h3>
              <p class="text-sm text-primary-100 mb-4">
                Get the full details about my experience, skills, and achievements.
              </p>
              <UButton
                label="Download PDF"
                icon="i-heroicons-arrow-down-tray"
                color="white"
                block
                @click="downloadCV"
              />
            </div>

            <!-- Recent Projects Widget -->
            <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Recent Projects
              </h3>
              <div class="space-y-3">
                <NuxtLink
                  v-for="project in recentProjects"
                  :key="project.id"
                  :to="`/projects/${project.slug}`"
                  class="group block"
                >
                  <div class="flex items-center space-x-3">
                    <div class="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        :src="project.image"
                        :alt="project.title"
                        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="text-sm font-medium text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200 truncate">
                        {{ project.title }}
                      </p>
                      <p class="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {{ project.category }}
                      </p>
                    </div>
                  </div>
                </NuxtLink>
              </div>
              <UButton
                label="View All Projects"
                icon="i-heroicons-arrow-right"
                variant="ghost"
                size="sm"
                block
                class="mt-4"
                @click="navigateTo('/projects')"
              />
            </div>

          </aside>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-24 bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-900 dark:to-secondary-900">
      <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">
          Let's Work Together
        </h2>
        <p class="text-lg text-primary-100 mb-8 max-w-2xl mx-auto">
          I'm always interested in hearing about new projects and opportunities. 
          Whether you have a question or just want to say hi, feel free to get in touch.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <UButton
            label="Start a Conversation"
            icon="i-heroicons-chat-bubble-left-right"
            size="lg"
            color="white"
            @click="openModal('contact')"
          />
          <UButton
            label="View My Projects"
            icon="i-heroicons-folder-open"
            variant="outline"
            size="lg"
            color="white"
            @click="navigateTo('/projects')"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// SEO
useHead({
  title: 'About Me - Portfolio',
  meta: [
    { name: 'description', content: 'Learn more about my journey as a developer, my skills, experience, and what drives me to create exceptional digital experiences.' },
    { property: 'og:title', content: 'About Me - Portfolio' },
    { property: 'og:description', content: 'Passionate developer with 5+ years of experience building modern web applications.' }
  ]
})

// Composables
const { openModal } = useModal()

// Core values
const coreValues = [
  {
    title: 'User-Centric Design',
    description: 'Every project starts with understanding user needs and creating intuitive experiences that delight.',
    icon: 'i-heroicons-user-group'
  },
  {
    title: 'Clean Code',
    description: 'Writing maintainable, well-documented code that other developers can understand and build upon.',
    icon: 'i-heroicons-code-bracket-square'
  },
  {
    title: 'Continuous Learning',
    description: 'Staying current with emerging technologies and best practices to deliver cutting-edge solutions.',
    icon: 'i-heroicons-academic-cap'
  },
  {
    title: 'Collaboration',
    description: 'Working closely with teams, clients, and stakeholders to ensure project success and alignment.',
    icon: 'i-heroicons-users'
  }
]

// Experience timeline
const experiences = [
  {
    title: 'Senior Full-Stack Developer',
    company: 'Tech Solutions Ltd',
    period: '2023 - Present',
    description: 'Leading development of enterprise web applications, mentoring junior developers, and architecting scalable solutions for high-traffic platforms.',
    technologies: ['Vue.js', 'Node.js', 'PostgreSQL', 'AWS', 'Docker'],
    icon: 'i-heroicons-building-office'
  },
  {
    title: 'Frontend Developer',
    company: 'Digital Agency Co',
    period: '2021 - 2023',
    description: 'Developed responsive web applications and e-commerce platforms, collaborated with designers to implement pixel-perfect UIs.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'],
    icon: 'i-heroicons-computer-desktop'
  },
  {
    title: 'Junior Developer',
    company: 'Startup Innovations',
    period: '2020 - 2021',
    description: 'Built mobile applications, contributed to full-stack development, and gained experience in agile methodologies.',
    technologies: ['React Native', 'Express', 'MongoDB', 'Firebase'],
    icon: 'i-heroicons-rocket-launch'
  }
]

// Technical skills with proficiency
const technicalSkills = [
  {
    category: 'Frontend Development',
    icon: 'i-heroicons-device-phone-mobile',
    skills: [
      { name: 'Vue.js / Nuxt', level: 95 },
      { name: 'React / Next.js', level: 90 },
      { name: 'TypeScript', level: 88 },
      { name: 'Tailwind CSS', level: 92 }
    ]
  },
  {
    category: 'Backend Development',
    icon: 'i-heroicons-server',
    skills: [
      { name: 'Node.js', level: 85 },
      { name: 'Python', level: 80 },
      { name: 'PostgreSQL', level: 82 },
      { name: 'REST APIs', level: 90 }
    ]
  },
  {
    category: 'DevOps & Tools',
    icon: 'i-heroicons-wrench-screwdriver',
    skills: [
      { name: 'Git', level: 92 },
      { name: 'Docker', level: 75 },
      { name: 'AWS', level: 70 },
      { name: 'CI/CD', level: 78 }
    ]
  }
]

// Education & certifications
const educationItems = [
  {
    title: 'BSc Computer Science',
    institution: 'University of Technology',
    year: '2016 - 2020',
    description: 'First Class Honours with focus on software engineering and web technologies.',
    icon: 'i-heroicons-academic-cap'
  },
  {
    title: 'AWS Certified Developer',
    institution: 'Amazon Web Services',
    year: '2022',
    description: 'Associate level certification demonstrating expertise in AWS cloud services.',
    icon: 'i-heroicons-shield-check'
  },
  {
    title: 'Advanced React Certification',
    institution: 'Meta',
    year: '2021',
    description: 'Professional certificate covering advanced React patterns and best practices.',
    icon: 'i-heroicons-check-badge'
  },
  {
    title: 'Accessibility Specialist',
    institution: 'W3C',
    year: '2023',
    description: 'Certified in web accessibility standards and WCAG compliance implementation.',
    icon: 'i-heroicons-sparkles'
  }
]

// Interests & hobbies
const interests = [
  {
    title: 'Photography',
    subtitle: 'Visual storytelling',
    icon: 'i-heroicons-camera'
  },
  {
    title: 'Open Source',
    subtitle: 'Community contributions',
    icon: 'i-heroicons-code-bracket'
  },
  {
    title: 'Travel',
    subtitle: 'Exploring cultures',
    icon: 'i-heroicons-globe-alt'
  },
  {
    title: 'Fitness',
    subtitle: 'Staying active',
    icon: 'i-heroicons-heart'
  },
  {
    title: 'Writing',
    subtitle: 'Technical blogs',
    icon: 'i-heroicons-pencil-square'
  },
  {
    title: 'Gaming',
    subtitle: 'Strategic thinking',
    icon: 'i-heroicons-puzzle-piece'
  },
  {
    title: 'Music',
    subtitle: 'Playing guitar',
    icon: 'i-heroicons-musical-note'
  },
  {
    title: 'Reading',
    subtitle: 'Tech & fiction',
    icon: 'i-heroicons-book-open'
  }
]

// Quick facts
const quickFacts = [
  {
    label: 'Location',
    value: 'London, UK',
    icon: 'i-heroicons-map-pin'
  },
  {
    label: 'Languages',
    value: 'English, Spanish',
    icon: 'i-heroicons-language'
  },
  {
    label: 'Experience',
    value: '5+ Years',
    icon: 'i-heroicons-briefcase'
  },
  {
    label: 'Timezone',
    value: 'GMT (UTC+0)',
    icon: 'i-heroicons-clock'
  },
  {
    label: 'Response Time',
    value: 'Within 24 hours',
    icon: 'i-heroicons-bolt'
  }
]

// Contact information
const contactInfo = [
  {
    label: 'hello@example.com',
    href: 'mailto:hello@example.com',
    icon: 'i-heroicons-envelope'
  },
  {
    label: '+44 (0) 123 456 7890',
    href: 'tel:+441234567890',
    icon: 'i-heroicons-phone'
  },
  {
    label: 'London, United Kingdom',
    href: '#',
    icon: 'i-heroicons-map-pin'
  }
]

// Social links
const socialLinks = [
  { name: 'GitHub', icon: 'i-simple-icons-github', url: 'https://github.com' },
  { name: 'LinkedIn', icon: 'i-simple-icons-linkedin', url: 'https://linkedin.com' },
  { name: 'Twitter', icon: 'i-simple-icons-twitter', url: 'https://twitter.com' },
  { name: 'Dribbble', icon: 'i-simple-icons-dribbble', url: 'https://dribbble.com' }
]

// Recent projects (mock data)
const recentProjects = [
  {
    id: '1',
    title: 'E-commerce Platform',
    slug: 'ecommerce-platform',
    category: 'Web Development',
    image: '/images/projects/ecommerce.jpg'
  },
  {
    id: '2',
    title: 'Mobile Banking App',
    slug: 'mobile-banking-app',
    category: 'Mobile App',
    image: '/images/projects/banking.jpg'
  },
  {
    id: '3',
    title: 'Task Management API',
    slug: 'task-management-api',
    category: 'API Development',
    image: '/images/projects/api.jpg'
  }
]

// Methods
const openExternalLink = (url: string) => {
  window.open(url, '_blank', 'noopener,noreferrer')
}

const downloadCV = () => {
  const link = document.createElement('a')
  link.href = '/cv.pdf'
  link.download = 'CV-Portfolio.pdf'
  link.click()
}
</script>
